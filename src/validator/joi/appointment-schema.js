import { object, number, string, boolean } from "joi";
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
} from "../validationMessages";

export default object().keys({
  appointmentId: string()
    .trim()
    .length(idLength)
    .required()
    .error(() => idError),
  tutorId: string()
    .trim()
    .length(idLength)
    .required()
    .error(() => idError),
  studentId: string()
    .trim()
    .length(idLength)
    .required()
    .error(() => idError),
  courseId: string()
    .trim()
    .required()
    .error(() => courseIdError),
  appointmentDate: number()
    .integer()
    .positive()
    .greater(minDate)
    .required()
    .error(() => dateError),
  location: string()
    .trim()
    .min(minLocationLength)
    .max(maxLocationLength)
    .required()
    .error(() => locationError),
  canceled: boolean().error(() => booleanError),
  noShow: boolean().error(() => booleanError),
  comment: string().trim().min(minContentLength).max(maxContentLength).error(),
});
