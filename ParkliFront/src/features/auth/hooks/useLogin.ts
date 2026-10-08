import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await login(email, password);
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Login request failed", {
          status: error.response?.status,
          url: error.config?.url,
          response: error.response?.data,
          message: error.message,
        });
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