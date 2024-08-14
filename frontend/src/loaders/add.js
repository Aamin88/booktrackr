import instance from "../config/axios";

async function loader() {
  try {
    const res = await instance.get("/");

    return {
      data: res?.data,
    };
  } catch (error) {
    throw Error(error);
  }
}

export default loader;
