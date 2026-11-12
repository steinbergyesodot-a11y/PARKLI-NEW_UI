import { useState } from "react";
import imageCompression from "browser-image-compression";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { useLoading } from "../../../context/LoadingContext";
import { addDrivewayService } from "../service/becomeHostService";
import { PARKLI_DRIVEWAY_NOTE_OPTIONS } from "../utils/notes";
import { saveNewDriveway } from "../utils/newDrivewayStorage";
import type { ParsedAddress } from "../utils/mapboxAddress";


export interface drivewayFormData {
  ownerId: string;
  fullAddress: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  latitude:number;
  longitude:number;
  publicDisplay:string;
  name: string;
  walk: string;
  price: string;
  images: File[];
  rules: string[];
  description: string;
}

export function useBecomeHost() {
    const { user, isAuthenticated } = useAuth();
    const { showToast } = useToast();
    const { isLoading: isSubmitting, showLoading, hideLoading } = useLoading();
    const [step, setStep] = useState<1 | 2 | 3 | 4 |5>(1);
    const [formData, setFormData] = useState<drivewayFormData>({
        ownerId: "",
        fullAddress: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        latitude: 0,
        longitude: 0,
        publicDisplay: "",
        name: "",
        walk: "",
        price: "",
        images: [],
        rules: [],
        description: "",
      });
      const [onboardingUrl, setOnboardingUrl] = useState<string | null>(null);

      const showSubmitError = (message: string) => showToast(message, "error");

      const handleChange = (
        field: keyof drivewayFormData,
        value: string | string[] | File | File[] | null
        ) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

      // Typing invalidates any previously selected address until a new suggestion is picked.
      const handleAddressInput = (text: string) => {
        setFormData(prev => ({
          ...prev,
          fullAddress: text,
          address: "",
          city: "",
          state: "",
          zipcode: "",
          latitude: 0,
          longitude: 0,
        }));
      };

      const handleAddressSelect = (parsed: ParsedAddress) => {
        setFormData(prev => ({ ...prev, ...parsed }));
      };

      async function createDriveway(){
        if (isSubmitting) return;
        if (
          !formData.name.trim() ||
          !formData.address.trim() ||
          !formData.city.trim() ||
          !formData.state.trim() ||
          !formData.zipcode.trim()
        ) {
          showSubmitError("Please fill in the nickname and choose your address from the suggestions.");
          return;
        }
        if (!formData.walk || !formData.price || Number(formData.price) <= 0) {
          showSubmitError("Please select a walking time and a price.");
          return;
        }
        if (formData.images.length === 0) {
          showSubmitError("Please add at least one photo.");
          return;
        }
        if (!isAuthenticated || !user) {
          showSubmitError("You need to be logged in to list a driveway.");
          return;
        }
        showLoading("Creating your driveway…");
        let redirecting = false;
        try {
          const data = new FormData()
          data.append("ownerId", user._id);
          data.append("address", formData.address);
          data.append("city", formData.city);
          data.append("state", formData.state);
          data.append("zipcode", formData.zipcode);
          data.append("latitude", formData.latitude.toString());
          data.append("longitude", formData.longitude.toString());
          data.append("publicDisplay", formData.publicDisplay);
          data.append("name",formData.name)
          data.append("walk", formData.walk);
          data.append("price", formData.price);
          data.append("description", formData.description);
          // Backend expects rules as the note texts; formData.rules holds selected note ids
          const ruleTexts = formData.rules.map(
            (id) =>
              PARKLI_DRIVEWAY_NOTE_OPTIONS.find((option) => option.id === id)
                ?.defaultNoteText ?? id
          );
          data.append("rules", JSON.stringify(ruleTexts));
            const options = { 
            maxSizeMB: 1,
            maxWidthOrHeight: 1920, 
            useWebWorker: true 
          };
            for (const file of formData.images) {
                const compressedBlob = await imageCompression(file, options);
                const compressedFile = new File([compressedBlob], file.name, {
                type: file.type
            });
            data.append("images", compressedFile);
            }

          const apiResponse = await addDrivewayService.addDriveway(data);
          if (!apiResponse.success) {
            showSubmitError(apiResponse.error || "Could not create the driveway. Please try again.");
            return;
          }

          const onboardingUrl = apiResponse.data.onboardingUrl;
          const drivewayId = apiResponse.data.drivewayId || apiResponse.data._id;

          // Snapshot the driveway for the Onboard Complete page (shown after the Stripe redirect)
          saveNewDriveway({
            id: drivewayId ?? "",
            name: formData.name,
            address: apiResponse.data.address || formData.address,
            city: formData.city,
            state: formData.state,
            zipcode: formData.zipcode,
            price: formData.price,
            walk: formData.walk,
            imageCount: formData.images.length,
            createdAt: new Date().toISOString(),
          });

          if (!onboardingUrl) {
            showSubmitError("Driveway created, but we couldn't start Stripe onboarding. Please try again from your listings.");
            return;
          }

          setOnboardingUrl(onboardingUrl);
          // Stripe onboarding is an external URL, so a full-page redirect is required.
          // Keep the global loading overlay up while the browser navigates.
          redirecting = true;
          showLoading("Taking you to Stripe…");
          window.location.assign(onboardingUrl);
        } catch (error: any) {
          let userMsg = "Could not create the driveway. Please try again.";
          if (error?.response?.data) {
            const data = error.response.data;
            userMsg =
              typeof data === "string"
                ? data
                : data?.message || data?.error || userMsg;
          } else if (error?.message) {
            userMsg = error.message;
          }
          showSubmitError(userMsg);
        } finally {
          if (!redirecting) hideLoading();
        }
    }
    return {
        formData,
        setFormData,
        onboardingUrl,
        setOnboardingUrl,
        isSubmitting,
        handleChange,
        handleAddressInput,
        handleAddressSelect,
        createDriveway,
        step,
        setStep
    };
}  
