const regex = /```json|```/g;

async function extractJSONData(inputString) {
  const cleanedText = inputString.replace(/```json|```/g, "");

  return JSON.parse(cleanedText);
}

module.exports = extractJSONData;
