import instance from "../config/axios";

async function loader() {
  try {
    const res = await instance.get("/books");

    if (res.status) {
      return {
        data: res?.data,
      };
    }
  } catch (error) {
    throw Error(error);
  }
}

export default loader;
