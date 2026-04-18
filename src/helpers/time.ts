export function formatDuration(seconds: number): string {
  const totalSeconds = Math.floor(seconds);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      secs,
    ).padStart(2, "0")}`;
  }

  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

export function parseDurationToSeconds(duration: string): number {
  const parts = duration.split(":").map(Number);

  if (parts.length !== 4 || parts.some(isNaN)) {
    throw new Error("Formato de duração inválido. Use hh:mm:ss:ms");
  }

  const [hours, minutes, seconds, milliseconds] = parts;

  if (minutes >= 60 || seconds >= 60 || milliseconds >= 1000) {
    throw new Error("Valores fora do intervalo válido");
  }

  return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
}

export function parseDurationToMinutes(duration: string): number {
  const parts = duration.split(":").map(Number);

  if (parts.length !== 4 || parts.some(isNaN)) {
    throw new Error("Formato de duração inválido. Use hh:mm:ss:ms");
  }

  const [hours, minutes, seconds, milliseconds] = parts;

  if (minutes >= 60 || seconds >= 60 || milliseconds >= 1000) {
    throw new Error("Valores fora do intervalo válido");
  }

  const totalMinutes =
    hours * 60 + minutes + seconds / 60 + milliseconds / 60000;
  return Math.ceil(totalMinutes);
}
