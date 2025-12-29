export function formatDuration(seconds: number): string {
  const totalSeconds = Math.floor(seconds);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  }

  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

export function parseDurationToSeconds(duration: string): number {
  const parts = duration.split(":").map(Number);

  if (parts.some(isNaN)) {
    throw new Error("Formato de duração inválido");
  }

  // mm:ss
  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }

  // h:mm:ss
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }

  throw new Error("Formato de duração inválido");
}
