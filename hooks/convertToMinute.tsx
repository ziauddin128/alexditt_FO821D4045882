export default function ConvertToMinute(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const secStr = sec < 10 ? `0${sec}` : `${sec}`;
  return `${min}.${secStr}`;
}
