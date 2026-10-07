import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { authService } from "../services/authService";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { setSession } = useAuth();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await authService.login({ email, password });
      const session = response?.data ?? response;
      const token = session?.token ?? session?.accessToken;
      const user = session?.user ?? session?.payload;

      if (response?.success === false || !token || !user) {
       
        throw new Error(
          typeof response.error === "string"
            ? response.error
            : response.error?.message || "Login failed. Please try again."
        );
      }

      setSession(user, token);
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
      
      } else {
        console.error("Login failed", error);
      }

      const err = error as {
        response?: { data?: { error?: string | { message?: string }; message?: string } };
        message?: string;
      };
      const data = err.response?.data;
      setErrorMessage(
        typeof data === "string"
          ? data
          : typeof data?.error === "string"
            ? data.error
            : data?.error?.message ||
              data?.message ||
              err.message ||
              "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errorMessage,
    handleSubmit,
  };
}