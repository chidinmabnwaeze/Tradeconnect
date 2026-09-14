export function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}
export function formatDate(date: string | null) {
  const changeDate = date?.split("T")[0];
  return changeDate;
}
export function formatDays(days: string | null) {
  const targetDate = new Date(days || "");
  const now = new Date();
  const diffInMilliseconds = now.getTime() - targetDate.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else {
    return `${diffInDays} days ago`;
  }
}