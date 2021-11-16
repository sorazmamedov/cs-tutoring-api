import vs from "./validationSchemas";
import Joi from "joi";

export default Joi.object()
  .concat(vs.nanoid)
  .concat(vs.neiuId)
  .concat(vs.firstName)
  .concat(vs.lastName)
  .concat(vs.email)
  .concat(vs.about);
