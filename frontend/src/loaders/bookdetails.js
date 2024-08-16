import { toast } from "react-toastify";
import instance from "../config/axios";

async function loader({ params }) {
  try {
    const { bookId } = params;

    console.log(bookId);
    const res = await instance.get("/books/" + bookId);

    console.log(res);

    if (res?.status === 200) {
      const data = res.data;
      return {
        book: data.book,
        summary: data.summary,
      };
    }
  } catch (error) {
    if (error.response.status === 404) {
      return toast.error("book not found");
    } else {
      return toast.error("network error");
    }
  }
}

export default loader;
