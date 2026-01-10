export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Tomorrow";
  } else if (diffInDays === -1) {
    return "Yesterday";
  } else if (diffInDays > 0) {
    return `in ${diffInDays} days`;
  } else {
    return `${Math.abs(diffInDays)} days ago`;
  }
}
