import Joi from "joi";
import { len, errMessages as EM } from "../validationMessages";

export default Joi.object().keys({
  reportId: Joi.string()
    .length(len.idLength)
    .required()
    .error(() => EM.idError),
  tutorId: Joi.string()
    .length(len.idLength)
    .required()
    .error(() => EM.idError),
  studentId: Joi.string()
    .length(len.idLength)
    .required()
    .error(() => EM.idError),
  courseId: Joi.string()
    .required()
    .error(() => EM.courseIdError),
  submittedOn: Joi.number()
    .integer()
    .positive()
    .greater(len.minDate)
    .required()
    .error(() => EM.dateError),
  content: Joi.string()
    .min(len.minContentLength)
    .max(len.maxContentLength)
    .required()
    .error(() => EM.locationError),
  status: Joi.string().pattern(new RegExp(EM.statusPattern)),
});
