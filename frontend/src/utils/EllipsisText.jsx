function useEllipsisText() {
  const ellipsis = function (text, wordLength = 4) {
    let words = text.split(" ");

    const checkLength = words.length < wordLength;

    if (checkLength) return text;
    return words.slice(0, wordLength).join(" ") + "...";
  };

  return ellipsis;
}

export default useEllipsisText;
