import adminSchema from "./admin-schema";
import tutorSchema from "./tutor-schema";
import studentSchema from "./student-schema";
import announcementSchema from "./announcement-schema";
import appointmentSchema from "./appointment-schema";
import reportSchema from "./report-schema";
import courseSchema from "./course-schema";
import scheduleSchema from "./schedule-schema";
import semesterSchema from "./semester-schema";
import timeSlotSchema from "./timeSlot-schema";
import schemas from "./validationSchemas";
import calendarSchema from "./calendar-schema";

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
  adminValidator: (payload) => JoiValidator(payload, adminSchema),
  tutorValidator: (payload) => JoiValidator(payload, tutorSchema),
  studentValidator: (payload) => JoiValidator(payload, studentSchema),
  announcementValidator: (payload) => JoiValidator(payload, announcementSchema),
  appointmentValidator: (payload) => JoiValidator(payload, appointmentSchema),
  reportValidator: (payload) => JoiValidator(payload, reportSchema),
  courseValidator: (payload) => JoiValidator(payload, courseSchema),
  scheduleValidator: (payload) => JoiValidator(payload, scheduleSchema),
  semesterValidator: (payload) => JoiValidator(payload, semesterSchema),
  timeSlotValidator: (payload) => JoiValidator(payload, timeSlotSchema),
  calendarValidator: (payload, context) =>
    JoiValidator(payload, calendarSchema, context),
  schemas,
});

module.exports = validator;
