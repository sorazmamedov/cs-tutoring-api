import Joi from "joi";
import vs from "./validationSchemas";

export default Joi.object().keys({
  courseId: vs.requiredText,
  courseName: vs.requiredText,
  semesterId: vs.semesterId,
  instructorName: vs.requiredText,
  instructorEmail: vs.email,
});
