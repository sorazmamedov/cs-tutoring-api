import Joi from "joi";
import { len } from "../validationMessages";

const nanoid = Joi.string().trim().length(len.idLength).required();

const activeSemesters = Joi.array().items(
  Joi.string().trim().length(len.idLength)
);
const roles = Joi.array().items(Joi.number().valid(1960, 1988, 2017));

const url = Joi.string().uri({ scheme: "https" });

const neiuId = Joi.string()
  .allow("")
  .trim()
  .pattern(/^\d{9}$/);

const pronouns = Joi.string().allow("").trim().max(100);

const about = Joi.string()
  .allow("")
  .trim()
  .min(len.minLongTextLength)
  .max(len.maxLongTextLength);

const firstName = Joi.string()
  .trim()
  .min(len.minNameLength)
  .max(len.maxNameLength)
  .required();

const lastName = Joi.string()
  .trim()
  .min(len.minNameLength)
  .max(len.maxNameLength)
  .required();

const email = Joi.string()
  .trim()
  .email({
    minDomainSegments: 2,
    maxDomainSegments: 2,
    tlds: { allow: ["edu"] },
  })
  .regex(/[A-Za-z0-9-]+@mindtek.edu$/)
  .required();

const shortText = Joi.string()
  .trim()
  .min(len.minShortTextLength)
  .max(len.maxShortTextLength)
  .required();

const longText = Joi.string()
  .allow("")
  .trim()
  .min(len.minLongTextLength)
  .max(len.maxLongTextLength);

const requiredText = Joi.string().trim().required();

const boolean = Joi.boolean().required();

const semesterName = Joi.string()
  .trim()
  .pattern(new RegExp(/^(Spring|Summer|Fall|Winter)$/))
  .required();

const year = Joi.number().integer().positive().min(len.minYear).required();

const date = Joi.date().prefs({ convert: true }).min(len.minDate).required();

const startDate = Joi.date()
  .prefs({ convert: true })
  .min(len.minDate)
  .required();

const endDate = Joi.date()
  .prefs({ convert: true })
  .greater(Joi.ref("startDate"))
  .required();

const start = Joi.date()
  .prefs({ convert: true })
  .min(Joi.ref("$min"))
  .less(Joi.ref("$max"))
  .required();

const end = Joi.date()
  .prefs({ convert: true })
  .greater(Joi.ref("start"))
  .less(Joi.ref("$max"))
  .required();

const weekday = Joi.string()
  .trim()
  .pattern(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/)
  .required();

const startHour = Joi.string()
  .trim()
  .pattern(/^([1-9]|1[0-2]):[0-5][0-9]\s(a.m.|p.m.)$/)
  .required();

const endHour = Joi.string()
  .trim()
  .pattern(/^([1-9]|1[0-2]):[0-5][0-9]\s(a.m.|p.m.)$/)
  .required();

const sessionDuration = Joi.number()
  .integer()
  .positive()
  .min(len.minSessionDuration)
  .max(len.maxSessionDuration)
  .required();

export default Object.freeze({
  nanoid,
  activeSemesters,
  roles,
  url,
  neiuId,
  pronouns,
  about,
  firstName,
  lastName,
  email,
  shortText,
  longText,
  requiredText,
  boolean,
  semesterName,
  year,
  date,
  startDate,
  endDate,
  start,
  end,
  weekday,
  startHour,
  endHour,
  sessionDuration,
});

export {
  nanoid,
  activeSemesters,
  roles,
  url,
  neiuId,
  pronouns,
  about,
  firstName,
  lastName,
  email,
  shortText,
  longText,
  requiredText,
  boolean,
  semesterName,
  year,
  date,
  startDate,
  endDate,
  start,
  end,
  weekday,
  startHour,
  endHour,
  sessionDuration,
};
