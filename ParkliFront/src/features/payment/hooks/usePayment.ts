import { isAxiosError } from "axios";
import { useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import type { IGame } from "../../find-parking/components/DrivewayCard";
import type { Driveway } from "../../find-parking/hooks/useFindParking";
import { paymentService } from "../services/paymentService";

interface UsePaymentProps {
  driveway: (Driveway & { ownerId?: string }) | null;
  game?: IGame;
}

export function usePayment({ driveway, game }: UsePaymentProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const requestInProgress = useRef(false);

  async function handlePay() {
    if (requestInProgress.current || clientSecret) return;
    setErrorMessage(null);

    if (!user) {
      setErrorMessage("Please sign in before paying.");
      return;
    }
    if (!driveway || !game || game.booked || game.blocked) {
      setErrorMessage("Please select an available game before paying.");
      return;
    }
    if (!driveway.ownerId) {
      setErrorMessage("The parking spot's owner information is missing. Please try again later.");
      return;
    }

    requestInProgress.current = true;
    setLoading(true);

    try {
      const response = await paymentService.createPaymentIntent({
        renterId: user._id,
        ownerId: driveway.ownerId,
        drivewayId: driveway._id,
        address: driveway.address,
        visiting_team: game.visiting_team,
        gameDate: game.date,
        parkingBegins: game.parkingBegins,
        price: driveway.price,
      });
      const secret = response?.data?.clientSecret ?? response?.clientSecret;
      if (typeof secret !== "string" || !secret.trim()) {
        throw new Error("The server did not return a payment client secret. Please try again.");
      }
      setClientSecret(secret);
    } catch (error: unknown) {
      const backendError = isAxiosError(error)
        ? error.response?.data?.error ?? error.response?.data?.message ?? error.response?.data?.Message
        : undefined;
      setErrorMessage(
        typeof backendError === "string"
          ? backendError
          : error instanceof Error
            ? error.message
            : "Unable to start payment. Please try again.",
      );
    } finally {
      requestInProgress.current = false;
      setLoading(false);
    }
  }

  return { loading, errorMessage, clientSecret, handlePay };
}