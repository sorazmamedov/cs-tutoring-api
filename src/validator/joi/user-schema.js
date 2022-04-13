import Joi from "joi";
import vs from "./validationSchemas";

export default Joi.object().keys({
  id: vs.nanoid,
  firstName: vs.firstName,
  lastName: vs.lastName,
  pronouns: vs.pronouns,
  email: vs.email,
  isActive: vs.boolean,
  roles: vs.roles,
  picture: vs.url,
  activeSemesters: vs.activeSemesters,
  neiuId: vs.neiuId,
  about: vs.about
});
