export default function convertDate(data: string) {
  const formattedDate = data ? new Date(data).toLocaleDateString("en-CA") : "";

  return formattedDate;
}
