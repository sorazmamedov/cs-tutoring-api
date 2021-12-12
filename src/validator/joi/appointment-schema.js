import vs from "./validationSchemas";
import Joi from "joi";

export default Joi.object().keys({
  appointmentId: vs.nanoid,
  tutorId: vs.nanoid,
  studentId: vs.nanoid,
  courseId: vs.requiredText,
  appointmentDate: vs.date,
  location: vs.shortText,
  canceled: vs.boolean,
  noShow: vs.boolean,
  comment: vs.longText,
});
