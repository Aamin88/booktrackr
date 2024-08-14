const mongoose = require("mongoose");

const connect = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  if (conn) {
    console.log({
      host: conn.connection.host,
      port: conn.connection.port,
      name: conn.connection.name,
    });
  }
  return conn;
};

const close = async () => {
  await mongoose.connection.close();
  console.log("db closed");
};

module.exports = { connect, close };
