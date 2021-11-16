import Joi from "joi";
import {
  idError,
  idLength,
  dateError,
  minDate,
  courseIdError,
  locationError,
  minLocationLength,
  maxLocationLength,
  minContentLength,
  maxContentLength,
  booleanError,
  contentError,
} from "../validationMessages";

export default Joi.object().keys({
  appointmentId: Joi.string()
    .trim()
    .length(idLength)
    .required()
    .error(() => idError),
  tutorId: Joi.string()
    .trim()
    .length(idLength)
    .required()
    .error(() => idError),
  studentId: Joi.string()
    .trim()
    .length(idLength)
    .required()
    .error(() => idError),
  courseId: Joi.string()
    .trim()
    .required()
    .error(() => courseIdError),
  appointmentDate: Joi.number()
    .integer()
    .positive()
    .greater(minDate)
    .required()
    .error(() => dateError),
  location: Joi.string()
    .trim()
    .min(minLocationLength)
    .max(maxLocationLength)
    .required()
    .error(() => locationError),
  canceled: Joi.boolean().error(() => booleanError),
  noShow: Joi.boolean().error(() => booleanError),
  comment: Joi.string()
    .trim()
    .min(minContentLength)
    .max(maxContentLength)
    .error(() => contentError),
});
