import Joi from "joi";
import { len } from "../validationMessages";

export default Object.freeze({
  nanoid: Joi.string().trim().length(len.idLength).required(),

  neiuId: Joi.number()
    .integer()
    .min(len.neiuIdStart)
    .max(len.neiuIdEnd)
    .required(),

  firstName: Joi.string()
    .trim()
    .min(len.minNameLength)
    .max(len.maxNameLength)
    .required(),

  lastName: Joi.string()
    .trim()
    .min(len.minNameLength)
    .max(len.maxNameLength)
    .required(),

  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 2,
      tlds: { allow: ["edu"] },
    })
    .regex(/[A-Za-z0-9-]+@neiu.edu$/)
    .required(),

  date: Joi.number().integer().positive().greater(len.minDate).required(),

  shortText: Joi.string()
    .trim()
    .min(len.minShortTextLength)
    .max(len.maxShortTextLength)
    .required(),

  longText: Joi.string()
    .trim()
    .min(len.minLongTextLength)
    .max(len.maxLongTextLength),

  requiredText: Joi.string().trim().required(),

  boolean: Joi.boolean().required(),

  //Course

  //Semester
  semesterId: Joi.string()
    .trim()
    .pattern(new RegExp(/^(Fall|Spring|Summer)[2-9]\d{3}$/))
    .required(),
  semesterName: Joi.string()
    .trim()
    .pattern(new RegExp(/^(Fall|Spring|Summer)$/))
    .required(),
  year: Joi.number().integer().positive().greater(len.minYear).required(),
  endDate: Joi.number()
    .integer()
    .positive()
    .greater(Joi.ref("startDate"))
    .required(),

  //Report
  status: Joi.string()
    .pattern(new RegExp(/^(pending|sent|error)$/))
    .required(),

  //Schedule
  weekday: Joi.number()
    .integer()
    .positive()
    .min(len.minDay)
    .max(len.maxDay)
    .required(),

  startHour: Joi.number()
    .integer()
    .positive()
    .min(len.minStartHour)
    .max(len.maxEndHour - 1)
    .required(),

  endHour: Joi.number()
    .integer()
    .positive()
    .greater(Joi.ref("startHour"))
    .max(len.maxEndHour)
    .required(),

  sessionDuration: Joi.number()
    .integer()
    .positive()
    .min(len.minSessionDuration)
    .max(len.maxSessionDuration)
    .required(),
});
