const geminiModel = require("../config/gemini");
const extractJSONData = require("./extractJSONData");

const runGemini = async (bookTitle, bookAuthor) => {
  // const prompt = `Write a story about a AI and magic`;
  const prompt = `Provide a detailed summary of the book '${bookTitle}' by ${bookAuthor}, broken down by chapters, focusing on the main concepts and key lessons in each chapter with a little bit of contextual explaination. present the response as an object with the appropriate key value pair but put the chapters value into an array and also give an overall summary of the book.`;

  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
};

runGemini("The Intelligent Investor", "Benjamin Graham");
module.exports = runGemini;
