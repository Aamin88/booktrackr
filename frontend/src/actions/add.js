import { redirect } from "react-router-dom";
import instance from "../config/axios";
import { toast } from "react-toastify";

export default async function action({ request }) {
  const formData = await request.formData();
  const bookData = Object.fromEntries(formData);

  const image = formData.get("coverImage");

  if (!bookData.title || !bookData.author) {
    return toast.error("Fill title and author");
  }

  const testData = new FormData();

  testData.append("title", bookData?.title);
  testData.append("author", bookData?.author);
  testData.append("genre", bookData?.genre);
  testData.append("desc", bookData?.desc);
  testData.append("imgfile", image);
  testData.append("dateOfPublication", bookData?.dateOfPublication);

  try {
    const res = await instance.post("/books", testData);

    if (res.data) {
      toast.info("book added");
    }

    return redirect(`/${res.data.book._id}`);
  } catch (error) {
    return toast.error(error.message);
  }
}
