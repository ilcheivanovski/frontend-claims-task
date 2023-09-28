export function ToDateOnly(currentDate: Date) {
  // Extract the date part (year, month, and day)
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
  const day = currentDate.getDate();

  // Create a string in the "YYYY-MM-DD" format
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  // Log or use the formatted date as needed

  return formattedDate;
}
