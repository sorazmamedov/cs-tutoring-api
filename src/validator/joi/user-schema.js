import Joi from "joi";
import vs from "./validationSchemas";
import { len } from "../validationMessages";

export default Joi.object().keys({
  id: vs.nanoid,
  firstName: vs.firstName,
  lastName: vs.lastName,
  pronouns: Joi.string().allow("").trim().max(100),
  email: vs.email,
  isActive: vs.boolean,
  roles: vs.roles,
  picture: vs.url,
  activeSemesters: vs.activeSemesters,
  neiuId: Joi.string()
    .allow("")
    .trim()
    .pattern(/^\d{9}$/),
  about: Joi.string()
    .allow("")
    .trim()
    .min(len.minLongTextLength)
    .max(len.maxLongTextLength),
});
