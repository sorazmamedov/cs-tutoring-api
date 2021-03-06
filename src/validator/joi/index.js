import userSchema from "./user-schema";
import announcementSchema from "./announcement-schema";
import appointmentSchema from "./appointment-schema";
import reportSchema from "./report-schema";
import courseSchema from "./course-schema";
import scheduleSchema from "./schedule-schema";
import semesterSchema from "./semester-schema";
import timeslotSchema from "./timeslot-schema";
import schemas from "./validationSchemas";
import calendarSchema from "./calendar-schema";
import eventSchema from "./event-schema";

let JoiValidator = (payload, schema, context) => {
  let { error } = schema.validate(payload, {
    abortEarly: false,
    convert: false,
    ...context,
  });

  if (error) {
    let message = error.details.map((el) => el.message).join("\n");
    return {
      error: message,
    };
  }
  return true;
};

let validator = Object.freeze({
  userValidator: (payload) => JoiValidator(payload, userSchema),
  announcementValidator: (payload) => JoiValidator(payload, announcementSchema),
  appointmentValidator: (payload) => JoiValidator(payload, appointmentSchema),
  reportValidator: (payload) => JoiValidator(payload, reportSchema),
  courseValidator: (payload) => JoiValidator(payload, courseSchema),
  scheduleValidator: (payload) => JoiValidator(payload, scheduleSchema),
  semesterValidator: (payload) => JoiValidator(payload, semesterSchema),
  timeslotValidator: (payload) => JoiValidator(payload, timeslotSchema),
  calendarValidator: (payload) => JoiValidator(payload, calendarSchema),
  eventValidator: (payload, context) =>
    JoiValidator(payload, eventSchema, context),
  schemas,
});

module.exports = validator;
