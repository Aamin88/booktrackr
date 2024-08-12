const mongoose = require("mongoose");

const connect = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  if (conn) {
    console.log(conn.connection.host);
  }
  return conn;
};

const close = async () => {
  await mongoose.connection.close();
  console.log("db closed");
};

module.exports = { seedDBConnect, seedDBclose };
