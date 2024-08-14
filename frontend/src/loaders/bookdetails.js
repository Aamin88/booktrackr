import instance from "../config/axios";

async function loader({ params }) {
  try {
    const { bookId } = params;
    const res = await instance.get("/" + bookId);

    const {
      _id,
      title,
      author,
      dateOfPublication,
      description,
      aiSummary,
      genre,
      coverImg,
      createdAt,
      updatedAt,
    } = res.data.book;

    const aiText = aiSummary[0];

    return {
      _id,
      title,
      author,
      dateOfPublication,
      description,
      aiText,
      genre,
      coverImg,
      createdAt,
      updatedAt,
    };
  } catch (error) {
    console.log(error);
  }
}

export default loader;
