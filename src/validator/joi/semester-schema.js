import Joi from "joi";
import vs from "./validationSchemas";

export default Joi.object().keys({
  semesterId: vs.semesterId,
  semesterName: vs.semesterId,
  academicYear: vs.year,
  startDate: vs.date,
  endDate: vs.endDate,
});
