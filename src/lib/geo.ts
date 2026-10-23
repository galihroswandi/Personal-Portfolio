/** Formats coordinates as `7.33°S 108.22°E` (city-level precision only). */
export function formatCoordinates(lat: number, lng: number): string {
  const latitude = `${Math.abs(lat).toFixed(2)}°${lat < 0 ? 'S' : 'N'}`;
  const longitude = `${Math.abs(lng).toFixed(2)}°${lng < 0 ? 'W' : 'E'}`;
  return `${latitude} ${longitude}`;
}
