const regex = /```json|```/g;

async function extractJSONData(inputString) {
  const cleanedText = inputString.replace(/^```json\s*|\s*```$/g, "");

  const fixedText = cleanedText.replace(/"([^"]*)"/g, (match, p1) => {
    return `"${p1.replace(/"/g, '\\"')}"`;
  });

  return JSON.parse(fixedText);
}

module.exports = extractJSONData;
