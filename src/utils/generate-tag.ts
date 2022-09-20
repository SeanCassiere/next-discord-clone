export function generateTag(): string {
  const number = Math.floor(1000 + Math.random() * 9000);
  if (number.toString().length !== 4) {
    return generateTag();
  }
  return number.toString();
}
