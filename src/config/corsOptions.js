import allowedOrigins from "./allowedOrigins";

export default {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS!"));
    }
  },

  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
};
