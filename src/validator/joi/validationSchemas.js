import Joi from "joi";
import { len } from "../validationMessages";

export default Object.freeze({
  nanoid: Joi.string().trim().length(len.idLength).required(),

  activeSemesters: Joi.array().items(
    Joi.string().trim().length(len.idLength).required()
  ),

  neiuId: Joi.string()
    .trim()
    .pattern(/^\d{9}$/)
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

  semesterName: Joi.string()
    .trim()
    .pattern(new RegExp(/^(Spring|Summer|Fall|Winter)$/))
    .required(),

  year: Joi.number().integer().positive().min(len.minYear).required(),

  // Dates
  date: Joi.date().prefs({ convert: true }).min(len.minDate).required(),

  startDate: Joi.date().prefs({ convert: true }).min(len.minDate).required(),

  endDate: Joi.date()
    .prefs({ convert: true })
    .greater(Joi.ref("startDate"))
    .required(),

  start: Joi.date()
    .prefs({ convert: true })
    .min(Joi.ref("$min"))
    .less(Joi.ref("$max"))
    .required(),

  end: Joi.date()
    .prefs({ convert: true })
    .greater(Joi.ref("start"))
    .less(Joi.ref("$max"))
    .required(),

  status: Joi.string()
    .pattern(new RegExp(/^(pending|sent|error)$/))
    .required(),

  weekday: Joi.string()
    .trim()
    .pattern(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/)
    .required(),

  startHour: Joi.string()
    .trim()
    .pattern(/^([1-9]|1[0-2]):[0-5][0-9]\s(a.m.|p.m.)$/)
    .required(),

  endHour: Joi.string()
    .trim()
    .pattern(/^([1-9]|1[0-2]):[0-5][0-9]\s(a.m.|p.m.)$/)
    .required(),

  sessionDuration: Joi.number()
    .integer()
    .positive()
    .min(len.minSessionDuration)
    .max(len.maxSessionDuration)
    .required(),
});
