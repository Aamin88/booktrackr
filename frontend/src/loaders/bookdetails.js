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
    console.log(error);
    return error;
  }
}

export default loader;
