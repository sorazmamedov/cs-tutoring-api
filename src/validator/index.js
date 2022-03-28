import {
  adminValidator,
  tutorValidator,
  userValidator,
  announcementValidator,
  appointmentValidator,
  reportValidator,
  courseValidator,
  scheduleValidator,
  semesterValidator,
  timeSlotValidator,
  calendarValidator,
  eventValidator,
  schemas,
} from "./joi";

let validator = Object.freeze({
  adminValidator: (payload) => adminValidator(payload),
  tutorValidator: (payload) => tutorValidator(payload),
  userValidator: (payload) => userValidator(payload),
  announcementValidator: (payload) => announcementValidator(payload),
  appointmentValidator: (payload) => appointmentValidator(payload),
  reportValidator: (payload) => reportValidator(payload),
  courseValidator: (payload) => courseValidator(payload),
  scheduleValidator: (payload) => scheduleValidator(payload),
  semesterValidator: (payload) => semesterValidator(payload),
  timeSlotValidator: (payload) => timeSlotValidator(payload),
  calendarValidator: (payload) => calendarValidator(payload),
  eventValidator: (payload, context) => eventValidator(payload, context),
  schemas,
});

module.exports = validator;
