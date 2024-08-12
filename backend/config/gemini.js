const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Access your API key as an environment variable (see "Set up your API key" above)
const geminiKey = process.env.GEMINI_KEY;

const genAI = new GoogleGenerativeAI(geminiKey);

module.exports = model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
