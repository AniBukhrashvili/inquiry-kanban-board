export default function Badge({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold bg-yellow-400 text-yellow-700 rounded-full whitespace-nowrap ${className}`}
    >
      {title}
    </span>
  );
}
