import { toast } from "react-toastify";
import instance from "../config/axios";
import { redirect } from "react-router-dom";

async function loader({ params }) {
  try {
    const { bookId } = params;

    console.log(bookId);
    const res = await instance.get("/books/" + bookId);

    if (res?.status === 200) {
      const data = res.data;
      return {
        book: data.book,
        summary: data.summary,
      };
    }
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("book not found");
      return redirect("/not-found");
    } else {
      toast.error("network error");
      return redirect("/books");
    }
  }
}

export default loader;
