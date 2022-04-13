import {
  userValidator,
  announcementValidator,
  appointmentValidator,
  reportValidator,
  courseValidator,
  scheduleValidator,
  semesterValidator,
  timeslotValidator,
  calendarValidator,
  eventValidator,
  schemas,
} from "./joi";

let validator = Object.freeze({
  userValidator: (payload) => userValidator(payload),
  announcementValidator: (payload) => announcementValidator(payload),
  appointmentValidator: (payload) => appointmentValidator(payload),
  reportValidator: (payload) => reportValidator(payload),
  courseValidator: (payload) => courseValidator(payload),
  scheduleValidator: (payload) => scheduleValidator(payload),
  semesterValidator: (payload) => semesterValidator(payload),
  timeslotValidator: (payload) => timeslotValidator(payload),
  calendarValidator: (payload) => calendarValidator(payload),
  eventValidator: (payload, context) => eventValidator(payload, context),
  schemas,
});

module.exports = validator;
