import express from "express";
import notFound from "./controllers/notFound";
import makeCallback from "./express-callback";
import dotenv from "dotenv";
dotenv.config();

const apiRoot = process.env.DM_BASE_URL;
const app = express();

app.use(express.json());

// Routes
app.use(`${apiRoot}/admins`, require("./routes/adminRouter"));
app.use(`${apiRoot}/students`, require("./routes/studentRouter"));
app.use(`${apiRoot}/tutors`, require("./routes/tutorRouter"));
app.use(`${apiRoot}/semesters`, require("./routes/semesterRouter"));
app.use(`${apiRoot}/courses`, require("./routes/courseRouter"));

app.use(makeCallback(notFound));

// listen for requests
app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

export default app;
