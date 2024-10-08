import axios from "axios";

// const baseURL = "http://localhost:5002";
const baseURL = "https://booktrackr-api.vercel.app";

// TODO: create another instances of axios of the get book route due
// to GEMINI longer to generate text, give it a time of 1.2 minutes
// longer timeout because of gemini -> takes longer to generate responses

const instance = axios.create({
  baseURL,
  timeout: 1000 * 60 * 10,
  headers: {
    "Content-type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance;
