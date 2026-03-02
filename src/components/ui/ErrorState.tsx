type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "Something went wrong",
  message = "Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <p className="font-semibold text-red-700">{title}</p>
      <p className="mt-1 text-sm text-red-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white"
        >
          Retry
        </button>
      )}
    </div>
  );
}
