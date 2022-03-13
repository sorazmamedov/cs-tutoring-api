import Joi from "joi";
import vs from "./validationSchemas";

export default Joi.object().keys({
  id: vs.nanoid,
  neiuId: vs.neiuId,
  firstName: vs.firstName,
  lastName: vs.lastName,
  email: vs.email,
  about: vs.longText,
  isActive: vs.boolean,
});
