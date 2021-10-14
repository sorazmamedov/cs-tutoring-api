import { adminValidator, tutorValidator, studentValidator } from "./joi";

let validator = Object.freeze({
  adminValidator: (payload) => adminValidator(payload),
  tutorValidator: (payload) => tutorValidator(payload),
  studentValidator: (payload) => studentValidator(payload),
});

module.exports = validator;
