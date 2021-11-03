import { object, number, string, boolean } from "joi";
import {
  idError,
  idLength,
  dateError,
  minDate,
  courseIdError,
  minContentLength,
  maxContentLength,
  statusPattern,
} from "../validationMessages";

export default object().keys({
  reportId: string()
    .length(idLength)
    .required()
    .error(() => idError),
  tutorId: string()
    .length(idLength)
    .required()
    .error(() => idError),
  studentId: string()
    .length(idLength)
    .required()
    .error(() => idError),
  courseId: string()
    .required()
    .error(() => courseIdError),
  submittedOn: number()
    .integer()
    .positive()
    .greater(minDate)
    .required()
    .error(() => dateError),
  content: string()
    .min(minContentLength)
    .max(maxContentLength)
    .required()
    .error(() => locationError),
  status: string().pattern(statusPattern),
});
