import Joi from "joi";
import vs from "./validationSchemas";

export default Joi.object().keys({
  reportId: vs.nanoid,
  tutorId: vs.nanoid,
  studentId: vs.nanoid,
  courseId: vs.requiredText,
  message: vs.longText.required(),
  submittedOn: vs.date,
  status: vs.status,
});
