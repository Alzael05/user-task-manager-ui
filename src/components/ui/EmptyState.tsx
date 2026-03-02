import { Link } from "react-router-dom";

type EmptyStateProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionTo?: string;
};

export default function EmptyState({
  title,
  subtitle,
  actionLabel,
  actionTo,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed bg-white p-8 text-center">
      <p className="text-lg font-semibold">{title}</p>
      {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
