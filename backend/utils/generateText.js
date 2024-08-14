const geminiModel = require("../config/gemini");
const extractJSONData = require("./extractJSONData");

const runGemini = async (bookTitle, bookAuthor) => {
  const prompt = `Provide a detailed summary of the book '${bookTitle}' by ${bookAuthor}, broken down by chapters, focusing on the main concepts and key lessons in each chapter with a little bit of contextual explaination for each chapter. present the response as an object with the appropriate key value pair but put the chapters value into an array and also give an overall summary of the book. the main concepts and key lessons should be also in arrays. And every chapter should have a title name chapter_title and chapter number`;

  const result = await geminiModel.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return extractJSONData(text);
};

module.exports = runGemini;
