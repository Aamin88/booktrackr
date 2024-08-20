const geminiModel = require("../config/gemini");
const extractJSONData = require("./extractJSONData");

const runGemini = async (bookTitle, bookAuthor) => {
  const prompt1 = `Generate a comprehensive summary of the book titled "${bookTitle}" authored by "${bookAuthor}" all in one  paragraph.`;

  const prompt2 = `who are the target_audience of this book "${bookTitle}" authored by "${bookAuthor}". In one paragraph`;

  const prompt3 = `Extract the key takeaways from the book titled '${bookTitle}' authored by '${bookAuthor}'. The response should be formatted as a JSON object with key-value pairs under the following fields:
  'concept': The takeaway in brief.
  'description': A detailed explanation of the takeaway.
  Ensure that the JSON output is:
  Properly formatted with all spaces and single quotes replaced with double quotes.
  All commas and curly brackets are correctly placed to avoid parsing issues.
  Any quotation within the text is enclosed in single quotations (' ') rather than double quotations
  `;

  const prompt4 = `List all the chapter of the book ${bookTitle} by ${bookAuthor}. Put your response in an array. Also given a short description of what the chapter is about. 
  Ensure that the JSON output is properly formatted, with all spaces and single quotes replaced with double quotes. All commas and curly brackets should be appropriately placed to prevent parsing issues. Additionally, any quotation within the text generated should be enclosed in single quotations (' ') rather than double quotations. The output should be syntactically correct and ready for immediate use without any JSON errors`;

  const summary = await geminiModel.generateContent(prompt1);
  const audience = await geminiModel.generateContent(prompt2);
  const keyLesson = await geminiModel.generateContent(prompt3);
  const chapters = await geminiModel.generateContent(prompt4);

  const summaryResponse = summary.response;
  const audienceResponse = audience.response;
  const lessonResponse = keyLesson.response;
  const chapterResponse = chapters.response;

  const summaryText = summaryResponse.text();
  const audienceText = audienceResponse.text();
  const chapterText = chapterResponse.text();
  const lessonText = lessonResponse.text();

  const cleanedLessonText = lessonText.replace(/^```json\s*|\s*```$/g, "");
  const cleanedChapterText = chapterText.replace(/^```json\s*|\s*```$/g, "");

  const responses = {
    overall_summary: summaryText,
    target_audience: audienceText,
    chapter_summary: JSON.parse(cleanedChapterText),
    key_lessons: JSON.parse(cleanedLessonText),
  };

  return responses;
};

// runGemini("The confidence gap", "Russ Haris");
module.exports = runGemini;
