import express from "express";
import notFound from "./controllers/notFound";
import makeCallback from "./express-callback";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const apiRoot = process.env.DM_BASE_URL;
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use(`${apiRoot}/admins`, require("./routes/adminRouter"));
app.use(`${apiRoot}/students`, require("./routes/studentRouter"));
app.use(`${apiRoot}/semesters`, require("./routes/semesterRouter"));
app.use(`${apiRoot}/schedules`, require("./routes/scheduleRouter"));
app.use(`${apiRoot}/announcements`, require("./routes/announcementRouter"));
app.use(`${apiRoot}/tutors`, require("./routes/tutorRouter"));
app.use(`${apiRoot}/courses`, require("./routes/courseRouter"));

app.use(makeCallback(notFound));

// listen for requests
app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

export default app;
