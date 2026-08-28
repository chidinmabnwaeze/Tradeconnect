export function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}
export function formatDate(date: string | null) {
  const changeDate = date?.split("T")[0];
  return changeDate;
}
