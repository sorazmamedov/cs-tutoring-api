import Joi from "joi";
import vs from "./validationSchemas";

export default Joi.object().keys({
  announcementId: vs.nanoid,
  publisherId: vs.nanoid,
  createdOn: vs.date,
  subject: vs.shortText,
  content: vs.longText,
  published: vs.boolean,
});
