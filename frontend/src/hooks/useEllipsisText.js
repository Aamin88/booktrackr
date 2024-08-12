function useEllipsisText({ text, wordLength = 3 }) {
  const ellipsis = function (text, wordLength) {
    let words = text.split(" ");

    const checkLength = words.length < wordLength;

    if (checkLength) return text;
    return words.slice(0, wordLength).join(" ") + "...";
  };

  return ellipsis(text, wordLength);
}

export default useEllipsisText;
