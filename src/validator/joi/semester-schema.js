import Joi from "joi";
import vs from "./validationSchemas";

export default Joi.object().keys({
  id: vs.nanoid,
  semesterName: vs.semesterName,
  academicYear: vs.year,
  startDate: vs.startDate,
  endDate: vs.endDate,
  active: vs.boolean,
});
