import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./controllers/notFound";
import makeCallback from "./express-callback";
import credentials from "./middleware/credentials";
import corsOptions from "./config/corsOptions";
import dotenv from "dotenv";
import verifyUser from "./middleware/verifyUser";
import errorHandler from "./middleware/errorHandler";
dotenv.config();

const apiRoot = process.env.DM_BASE_URL;
const app = express();

//middlewares
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes

//public endpoints
app.use(`${apiRoot}/auth`, require("./routes/authRouter"));
app.use(`${apiRoot}/semesters/public`, require("./routes/semesterRouter"));
app.use(`${apiRoot}/schedules/public`, require("./routes/scheduleRouter"));
app.use(`${apiRoot}/announcements/public`, require("./routes/announcementRouter"));

//protected endpoints
app.use(verifyUser);
app.use(`${apiRoot}/semesters`, require("./routes/semesterRouter"));
app.use(`${apiRoot}/schedules`, require("./routes/scheduleRouter"));
app.use(`${apiRoot}/users`, require("./routes/userRouter"));
app.use(`${apiRoot}/users/:id/calendars`, require("./routes/calendarRouter"));
app.use(`${apiRoot}/announcements`, require("./routes/announcementRouter"));
app.use(`${apiRoot}/courses`, require("./routes/courseRouter"));
app.use(`${apiRoot}/timeslots`, require("./routes/timeslotRouter"));
app.use(makeCallback(notFound));

app.use(errorHandler);

// listen for requests
app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

export default app;
