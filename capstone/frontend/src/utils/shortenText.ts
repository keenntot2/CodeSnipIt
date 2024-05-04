const shortenText = (text: string, minChar: number) => {
  if (text.length > minChar) {
    return `${text.slice(0, minChar)}...`;
  }
  return text;
};

export default shortenText;
