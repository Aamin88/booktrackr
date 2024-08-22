const geminiModel = require("../config/gemini");

const runGemini = async (bookTitle, bookAuthor) => {
  const prompt1 = `Write a summary of the book titled '${bookTitle}' authored by '${bookAuthor}' in one paragraph. Make sure to return a summary. If the book does not exist, respond with 'book does not exist.' Ensure that the response is well-formatted and clear.`;

  const prompt2 = `Identify the target audience for the book titled '${bookTitle}' authored by '${bookAuthor}'. Provide your response in one concise paragraph. If the book does not exist, respond with 'book does not exist.' Ensure that any quotes within the response are enclosed in single quotations (' '), and the text is correctly formatted for immediate use.`;

  const prompt3 = `Extract the key takeaways from each chapter of the book titled '${bookTitle}' authored by '${bookAuthor}'. The response should be formatted as a JSON object with key-value pairs under the following fields:
  'concept': The takeaway in brief.
  'description': A detailed explanation of the takeaway.
  The result should be in this format:  
  "key_lessons":{
  "concept": "this is the concept",
  "description": "this is the description"
  }
  Ensure that the JSON output is:
  Properly formatted with all spaces and single quotes replaced with double quotes.
  All commas and curly brackets are correctly placed to avoid parsing issues.
  Any quotation within the text is enclosed in single quotations (' ') rather than double quotations.
  If the book does not exist, return an empty array.
  `;

  try {
    const summary = await geminiModel.generateContent(prompt1);

    const audience = await geminiModel.generateContent(prompt2);
    const keyLesson = await geminiModel.generateContent(prompt3);

    const summaryResponse = summary.response;
    const audienceResponse = audience.response;
    const lessonResponse = keyLesson.response;

    const summaryText = summaryResponse
      .text()
      .replace(/(\r\n|\n|\r)/gm, "")
      .replace(/\s+$/g, "");
    const audienceText = audienceResponse
      .text()
      .replace(/(\r\n|\n|\r)/gm, "")
      .replace(/\s+$/g, "");
    const lessonText = lessonResponse.text();

    const cleanedLessonText = lessonText.replace(/^```json\s*|\s*```$/g, "");

    const responses = {
      overall_summary: summaryText,
      target_audience: audienceText,
      key_lessons:
        summaryText === "book does not exist."
          ? []
          : JSON.parse(cleanedLessonText),
    };

    console.log(responses);

    return responses;
  } catch (error) {
    console.log(error);
  }
};

// runGemini("The confidence gap", "Russ Haris");
// runGemini("The Great Gatsby", "F. Scott Fitzgerald");
// runGemini("hyuhijnhkuiljnjgkhijnbhjghuij", "xwdihbiwekjfulihojk;ejwkhflhiuew");
module.exports = runGemini;
