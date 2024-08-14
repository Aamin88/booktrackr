import instance from "../config/axios";

async function loader() {
  try {
    const res = await instance.get("/");
    const books = res.data.books;
    return books;
  } catch (error) {
    return error.message;
  }
}

export default loader;
