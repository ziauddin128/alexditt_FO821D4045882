export default function ConvertToSeconds(duration: string | number): number {
  const str = String(duration);
  if (str.includes(".")) {
    const [min, sec] = str.split(".").map(Number);
    return min * 60 + sec;
  } else {
    return Number(str) * 60;
  }
}
