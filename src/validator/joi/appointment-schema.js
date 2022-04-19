import vs from "./validationSchemas";
import Joi from "joi";

export default Joi.object().keys({
  id: vs.nanoid,
  slotId: vs.nanoid,
  tutorId: vs.nanoid,
  studentId: vs.nanoid,
  courseId: vs.requiredText,
  semesterId: vs.nanoid,
  start: Joi.date().required(),
  end: Joi.date().greater(Joi.ref("start")).required(),
  canceled: vs.boolean,
  noShow: vs.boolean,
  report: vs.longText,
});
