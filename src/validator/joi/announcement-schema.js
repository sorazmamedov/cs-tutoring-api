import { object, number, string, boolean } from "joi";
import {
  idError,
  idLength,
  subjectError,
  contentError,
  minSubjectLength,
  maxSubjectLength,
  minContentLength,
  maxContentLength,
  minDate,
  booleanError,
} from "../validationErrorMessages";

export default object().keys({
  announcementId: string()
    .trim()
    .length(idLength)
    .required()
    .error(() => idError),
  publisherId: string()
    .trim()
    .length(idLength)
    .required()
    .error(() => idError),
  createdOn: number()
    .integer()
    .positive()
    .greater(minDate)
    .required()
    .error(() => dateError),
  subject: string()
    .trim()
    .min(minSubjectLength)
    .max(maxSubjectLength)
    .required()
    .error(() => subjectError),
  content: string()
    .trim()
    .min(minContentLength)
    .max(maxContentLength)
    .required()
    .error(() => contentError),
  published: boolean().error(() => booleanError),
});
