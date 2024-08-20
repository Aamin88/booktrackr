const regex = /```html|```/g;

async function extractJSONData(inputString) {
  const cleanedText = inputString.replace(/^```\s*|\s*```$/g, "");

  const fixedText = cleanedText.replace(/"([^"]*)"/g, (match, p1) => {
    return `"${p1.replace(/"/g, '\\"')}"`;
  });

  try {
    const jsonData = JSON.parse(fixedText);
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}

module.exports = extractJSONData;
