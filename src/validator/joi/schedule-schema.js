import Joi from "joi";
import vs from "./validationSchemas";

export default Joi.object().keys({
  scheduleId: vs.nanoid,
  tutorId: vs.nanoid,
  semesterId: vs.semesterId,
  day: vs.weekday,
  startHour: vs.startHour,
  endHour: vs.endHour,
  sessionDuration: vs.sessionDuration,
});
