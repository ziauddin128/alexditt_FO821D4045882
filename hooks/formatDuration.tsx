export default function FormatDuration(seconds?: number | null) {
  if (!seconds && seconds !== 0) return "";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (hrs > 0) parts.push(`${hrs}hour${hrs > 1 ? "s" : ""}`);
  if (mins > 0) parts.push(`${mins}min`);
  if (secs > 0 || parts.length === 0)
    parts.push(`${secs.toString().padStart(2, "0")}sec`);

  return parts.join(" ");
}
