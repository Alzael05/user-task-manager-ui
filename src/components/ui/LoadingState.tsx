type LoadingStateProps = {
  title?: string;
  subtitle?: string;
};

export default function LoadingState({
  title = "Loading...",
  subtitle = "Please wait a moment.",
}: LoadingStateProps) {
  return (
    <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
      <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}
