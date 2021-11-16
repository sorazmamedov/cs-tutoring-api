import vs from "./validationSchemas";
import Joi from "joi";

export default Joi.object()
  .concat(vs.announcementId)
  .concat(vs.publisherId)
  .concat(vs.createdOn)
  .concat(vs.subject)
  .concat(vs.content)
  .concat(vs.published);
