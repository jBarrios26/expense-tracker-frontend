export function getCurrentPeriod(): string {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  return `${month.substring(0, 1).toUpperCase()}${month.substring(
    1
  )} - ${date.getFullYear()}`;
}
