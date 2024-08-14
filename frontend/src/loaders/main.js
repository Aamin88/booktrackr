import { toast } from "react-toastify";
import instance from "../config/axios";

async function loader() {
  try {
    const res = await instance.get("/books");
    console.log("ss");
    const data = res.data;

    // recommendations => selects three books randomly
    const getBookRecommendation = (data, numberOfRecommendations) => {
      const shuffled = data.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, numberOfRecommendations);
    };
    const books = getBookRecommendation(data?.books, 4);

    return { books };
  } catch (error) {
    const statusCode = error?.response?.status;
    if (statusCode === 400) {
      alert("console.log");
      toast.error("hi");
      return null;
    } else if (statusCode === 404) {
      alert("hi");
      return null;
    } else {
      console.log(error, ">>>>");
      return null;
    }
  }
}

export default loader;
