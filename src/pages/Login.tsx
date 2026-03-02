import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState<string | null>(null);

  const from =
    (location.state as { from?: { pathname?: string } })?.from?.pathname || "/tasks";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (_values: LoginForm) => {
    try {
      setAuthError(null);
      // TODO: replace with real auth request
      localStorage.setItem("auth_token", "demo-token");
      navigate(from, { replace: true });
    } catch {
      setAuthError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-2xl border bg-white shadow-sm md:grid-cols-2">
          <div className="hidden bg-gray-900 p-8 text-white md:block">
            <p className="text-sm uppercase tracking-wider text-gray-300">
              User Task Manager
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight">
              Stay organized with your daily tasks
            </h1>
            <p className="mt-3 text-sm text-gray-300">
              Sign in to view, create, and manage your tasks in one place.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Login</h2>
            <p className="mt-1 text-sm text-gray-600">Welcome back.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full rounded-lg border px-3 py-2 outline-none ring-0 focus:border-blue-500"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Password</label>
                <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full rounded-lg border px-3 py-2 outline-none ring-0 focus:border-blue-500"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              {authError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {authError}
                </div>
              )}

              <button
                disabled={isSubmitting}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
