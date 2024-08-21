const allowedOrigin = require("./allowedOrgin");

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigin.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed By Cors!"));
    }
  },
  methods: "*",
  optionsSuccessStatus: 200,
  credentials: true,
  allowedOrigin: true,
};

module.exports = corsOptions;
