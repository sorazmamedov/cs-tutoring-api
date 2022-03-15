import Joi from "joi";
import vs from "./validationSchemas";

export default Joi.object().keys({
  id: vs.nanoid,
  publisherId: vs.nanoid,
  semesterId: vs.nanoid,
  createdOn: vs.date,
  subject: vs.shortText,
  content: vs.longText,
  published: vs.boolean,
});
