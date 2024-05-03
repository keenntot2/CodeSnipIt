export const MIN_CHAR = 15;

const shortenText = (text: string) => {
  if (text.length > 15) {
    return `${text.slice(0, MIN_CHAR)}...`;
  }
  return text;
};

export default shortenText;
