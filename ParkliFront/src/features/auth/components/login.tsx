import { Link } from "react-router";
import Button from "../../../components/primitives/Button";
import { Card } from "../../../components/primitives/Card";
import { Input } from "../../../components/primitives/Input";
import { useLogin } from "../hooks/useLogin";

export function Login() {
	const {
		email,
		setEmail,
		password,
		setPassword,
		loading,
		errorMessage,
		handleSubmit,
	} = useLogin();

	return (
		<div className="flex w-full justify-center px-4 py-10">
			<Card className="!h-auto w-full max-w-md rounded-lg border-slate-200 bg-white p-6 shadow-sm sm:p-8">
				<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
					<h2 className="text-center text-2xl font-semibold text-slate-900">
						Welcome Back
					</h2>

					<div className="flex flex-col gap-4">
						<Input
							label="Email"
							type="email"
							autoComplete="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
						<Input
							label="Password"
							type="password"
							autoComplete="current-password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
						/>
					</div>

					{errorMessage && (
						<p className="text-sm text-red-600" role="alert">
							{errorMessage}
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
								Signing in...
							</span>
						) : (
							"Sign In"
						)}
					</Button>

					<p className="text-center text-sm text-slate-600">
						Don't have an account?{" "}
						<Link to="/signup" className="font-medium text-primary-start hover:underline">
							Sign up
						</Link>
					</p>
				</form>
			</Card>
		</div>
	);
}
