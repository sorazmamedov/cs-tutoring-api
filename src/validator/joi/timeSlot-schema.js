import Joi from "joi";
import vs from "./validationSchemas";

export default Joi.object().keys({
  slotId: vs.nanoid,
  scheduleId: vs.nanoid,
  slotDate: vs.date,
  startHour: vs.startHour,
  endHour: vs.endHour,
});
