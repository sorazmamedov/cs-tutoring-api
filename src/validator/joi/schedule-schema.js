import Joi from "joi";
import vs from "./validationSchemas";

export default Joi.object().keys({
  id: vs.nanoid,
  tutorId: vs.nanoid,
  semesterId: vs.nanoid,
  day: vs.weekday,
  startHour: vs.startHour,
  endHour: vs.endHour,
  location: vs.shortText,
  isActive: vs.boolean,
});
