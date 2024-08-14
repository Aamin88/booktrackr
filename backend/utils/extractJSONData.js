async function extractJSONData(text) {
  const regex = /```json\s*([\s\S]*?)\s*```/g;
  let match;
  const jsonDataArray = [];

  while ((match = regex.exec(text)) !== null) {
    try {
      const jsonData = JSON.parse(match[1]);
      jsonDataArray.push(jsonData);
      return jsonDataArray;
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  }
}

module.exports = extractJSONData;
