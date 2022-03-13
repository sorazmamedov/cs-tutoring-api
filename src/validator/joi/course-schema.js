import Joi from "joi";
import vs from "./validationSchemas";

export default Joi.object().keys({
  id: vs.nanoid,
  section: vs.shortText,
  courseName: vs.requiredText,
  semesterId: vs.nanoid,
  instructorName: vs.requiredText,
  instructorEmail: vs.email,
});
