import { MongoClient } from "mongodb";
import makeAnnouncementDb from "./announcement";
import makeAppointmentDb from "./appointment";
import makeCalendarDb from "./calendar";
import makeCourseDb from "./course";
import makeScheduleDb from "./schedule";
import makeSemesterDb from "./semester";
import makeTimeslotDb from "./timeslot";
import makeUserDb from "./user";

const url = process.env.DB_URL;
const client = new MongoClient(url, {
  useNewUrlParser: true,
});

export async function makeDb() {
  await client.connect();
  return client.db();
}

const announcement = makeAnnouncementDb({ makeDb });
const appointment = makeAppointmentDb({ makeDb });
const calendar = makeCalendarDb({ makeDb });
const course = makeCourseDb({ makeDb });
const schedule = makeScheduleDb({ makeDb });
const semester = makeSemesterDb({ makeDb });
const timeslot = makeTimeslotDb({ makeDb });
const user = makeUserDb({ makeDb });

export default Object.freeze({
  announcement,
  appointment,
  calendar,
  course,
  schedule,
  semester,
  timeslot,
  user,
});
