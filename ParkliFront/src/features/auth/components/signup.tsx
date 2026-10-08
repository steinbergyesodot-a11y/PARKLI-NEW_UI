import { Link } from "react-router";
import Button from "../../../components/primitives/Button";
import { Card } from "../../../components/primitives/Card";
import { Input } from "../../../components/primitives/Input";
import { useSignup } from "../hooks/useSignup";

export function Signup(){
    const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    password2,
    setPassword2,
    loading,
    errorMessage,
    message,
    handleSubmit,
  } = useSignup();

  return (
    <div className="flex w-full justify-center px-4 py-10">
      <Card className="!h-auto w-full max-w-md rounded-lg border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-semibold text-slate-900">
            Create Account
          </h2>

          <div className="flex flex-col gap-4">
            <Input
              label="First Name"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
            <Input
              label="Last Name"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <Input
              label="Create Password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600" role="alert">
              {errorMessage}
            </p>
          )}
          {message && (
            <p className="text-sm text-green-700" role="status">
              {message}
            </p>
          )}

          <Button
            className="!w-full !rounded-md !bg-primary-start !py-2.5 !font-medium !text-white hover:!bg-blue-700 disabled:!cursor-not-allowed disabled:!opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Signing up...
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-center text-sm text-slate-600">
            By signing up, you agree to our{" "}
            <Link to="/TermsOfUse" className="font-medium text-primary-start hover:underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link to="/PrivacyPolicy" className="font-medium text-primary-start hover:underline">
              Privacy Policy
            </Link>.
          </p>
        </form>
      </Card>
    </div>
  );
}