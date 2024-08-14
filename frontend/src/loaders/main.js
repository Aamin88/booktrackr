import instance from "../config/axios";

async function loader() {
  const res = await instance.get("/");
  const data = res.data;

  // recommendations => selects three books randomly
  const getBookRecommendation = (books, numberOfRecommendations) => {
    const shuffled = books.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfRecommendations);
  };
  const books = getBookRecommendation(data?.books, 4);
  return { books };
}

export default loader;
