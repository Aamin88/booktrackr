import instance from "../config/axios";

async function loader() {
  try {
    const res = await instance.get("/books");
    const books = res.data.books;
    console.log(books);
    return books;
  } catch (error) {
    return error.message;
  }
}

export default loader;
