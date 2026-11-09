import { useState } from "react";
import imageCompression from "browser-image-compression";
import { useAuth } from "../../../context/AuthContext";
import { addDrivewayService } from "../service/becomeHostService";
import { PARKLI_DRIVEWAY_NOTE_OPTIONS } from "../utils/notes";


export interface drivewayFormData {
  ownerId: string;
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
    const [step, setStep] = useState<1 | 2 | 3 | 4 |5>(1);
    const [formData, setFormData] = useState<drivewayFormData>({
        ownerId: "",
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


      const handleChange = (
        field: keyof drivewayFormData,
        value: string | string[] | File | File[] | null
        ) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

      async function createDriveway(){
         if(!formData.address || !formData.images || !formData.price  || !formData.walk || formData.description.length < 5){
        //   setMessage("Please fill address, add at least one image, select a price and walking time.");
          return
        }
        if (isAuthenticated && user){
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
            try{
               
                const apiResponse = await addDrivewayService.addDriveway(data);
                if(apiResponse.success){
                  const onboardingUrl = apiResponse.data.onboardingUrl;
                  const drivewayId = apiResponse.data.drivewayId || apiResponse.data._id;
                  const drivewayAddress = apiResponse.data.address;
            
            // Store newly created driveway info for Onboard-Complete
            if (drivewayId || drivewayAddress) {
              localStorage.setItem("newDrivewayId", drivewayId || "");
              localStorage.setItem("newDrivewayAddress", drivewayAddress || "");
            }
            
            if (onboardingUrl) {
              setOnboardingUrl(onboardingUrl)
              // window.location.href = onboardingUrl;
              return;
            }
          }
            }catch(error:any){
                let userMsg = "";
                if (error?.response?.data) {
                  const data = error.response.data;
                    userMsg =
                    typeof data === "string"
                        ? data
                : data?.message || data?.error || JSON.stringify(data);
                } else if (error?.message) {
                    userMsg = error.message;
                }
                    //  setMessage(userMsg);
        //   setMessageType("error");
            }finally{
                // setIsLoading(false)
            }
          }
    }
    return {
        formData,
        setFormData,
        onboardingUrl,
        setOnboardingUrl,
        handleChange,
        createDriveway,
        step,
        setStep
    };
}  
