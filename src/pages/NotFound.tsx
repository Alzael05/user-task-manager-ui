import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center">
        <div className="w-full rounded-2xl border bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-gray-500">404</p>
          <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
          <p className="mt-2 text-sm text-gray-600">
            The page you are looking for does not exist or was moved.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
            <Link
              to="/tasks"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
            >
              Go to Tasks
            </Link>
            <Link
              to="/login"
              className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
