import { toast } from "react-toastify";
import instance from "../config/axios";

async function loader() {
  try {
    const res = await instance.get("/books");
    const data = res.data;

    // recommendations => selects three books randomly
    const getBookRecommendation = (books, numberOfRecommendations) => {
      const shuffled = books.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, numberOfRecommendations);
    };
    const books = getBookRecommendation(data?.books, 4);

    return { books };
  } catch (error) {
    const statusCode = error.response.status;
    if (statusCode === 400) {
      console.log("console.log");
      toast.error("hi");
      return null;
    } else if (statusCode === 404) {
      console.log("hi");
    } else {
      console.log("ho");
    }
  }
}

export default loader;
