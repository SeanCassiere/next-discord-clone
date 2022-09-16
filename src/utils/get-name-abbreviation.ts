export function getNameAbbreviation(name: string) {
  const splitName = name.split(" ");

  if (splitName[0] && splitName.length === 1 && splitName[0].length > 2) {
    const firstLetter = splitName[0]?.charAt(0);
    const secondLetter = splitName[0]?.charAt(1);
    return `${firstLetter}${secondLetter}`.toUpperCase();
  }

  const firstWord = splitName[0];
  const secondWord = splitName[1];
  if (splitName.length >= 2 && firstWord && secondWord) {
    return `${firstWord.charAt(0)}${secondWord.charAt(0)}`.toUpperCase();
  }

  return "NA";
}
