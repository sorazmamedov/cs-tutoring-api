import {
  adminValidator,
  tutorValidator,
  studentValidator,
  announcementValidator,
  appointmentValidator,
  reportValidator,
  courseValidator,
  scheduleValidator,
  semesterValidator,
  timeSlotValidator,
  calendarValidator,
  schemas,
} from "./joi";

let validator = Object.freeze({
  adminValidator: (payload) => adminValidator(payload),
  tutorValidator: (payload) => tutorValidator(payload),
  studentValidator: (payload) => studentValidator(payload),
  announcementValidator: (payload) => announcementValidator(payload),
  appointmentValidator: (payload) => appointmentValidator(payload),
  reportValidator: (payload) => reportValidator(payload),
  courseValidator: (payload) => courseValidator(payload),
  scheduleValidator: (payload) => scheduleValidator(payload),
  semesterValidator: (payload) => semesterValidator(payload),
  timeSlotValidator: (payload) => timeSlotValidator(payload),
  calendarValidator: (payload, context) => calendarValidator(payload, context),
  schemas,
});

module.exports = validator;
