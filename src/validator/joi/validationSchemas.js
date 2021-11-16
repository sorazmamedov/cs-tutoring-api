import Joi from "joi";
import { len, errMessages as EM } from "../validationMessages";

export default Object.freeze({
  nanoid: Joi.object({
    id: Joi.string()
      .trim()
      .length(len.idLength)
      .required()
      .messages({
        "any.required": `"id" ${EM.isRequired}`,
        "string.empty": `"id" ${EM.isRequired}`,
        "string.length": EM.idError,
        "string.base": EM.idError,
      }),
  }),

  neiuId: Joi.object({
    neiuId: Joi.number()
      .integer()
      .min(len.neiuIdStart)
      .max(len.neiuIdEnd)
      .required()
      .messages({
        "number.base": EM.neiuIdError,
        "number.integer": EM.neiuIdError,
        "number.min": EM.neiuIdError,
        "number.max": EM.neiuIdError,
        "any.required": `"neiuId" ${EM.isRequired}`,
      }),
  }),

  firstName: Joi.object({
    firstName: Joi.string()
      .trim()
      .min(len.minFirstnameLength)
      .max(len.maxFirstnameLength)
      .required()
      .messages({
        "any.required": `"firstName" ${EM.isRequired}`,
        "string.empty": `"firstName" ${EM.isRequired}`,
        "string.length": EM.firstnameError,
        "string.base": EM.firstnameError,
      }),
  }),

  lastName: Joi.object({
    lastName: Joi.string()
      .trim()
      .min(len.minLastnameLength)
      .max(len.maxLastnameLength)
      .required()
      .messages({
        "any.required": `"lastName" ${EM.isRequired}`,
        "string.empty": `"lastName" ${EM.isRequired}`,
        "string.length": EM.lastnameError,
        "string.base": EM.lastnameError,
      }),
  }),

  email: Joi.object({
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 2,
        tlds: { allow: ["edu"] },
      })
      .required()
      .messages({
        "any.required": `"email" ${EM.isRequired}`,
        "string.empty": `"email" ${EM.isRequired}`,
        "string.email": EM.emailError,
        "string.base": EM.emailError,
      }),
  }),

  about: Joi.object({
    about: Joi.string()
      .trim()
      .min(len.minContentLength)
      .max(len.maxContentLength)
      .messages({
        "string.empty": `"about" ${EM.noEmpty}`,
        "string.min": `"about" ${EM.contentError}`,
        "string.max": `"about" ${EM.contentError}`,
        "string.base": `"about" ${EM.contentError}`,
      }),
  }),

  //Announcement
  announcementId: Joi.object({
    announcementId: Joi.string()
      .trim()
      .length(len.idLength)
      .required()
      .messages({
        "any.required": `"id" ${EM.isRequired}`,
        "string.empty": `"id" ${EM.isRequired}`,
        "string.length": EM.idError,
        "string.base": EM.idError,
      }),
  }),

  publisherId: Joi.object({
    publisherId: Joi.number()
      .integer()
      .min(len.neiuIdStart)
      .max(len.neiuIdEnd)
      .required()
      .messages({
        "number.base": EM.neiuIdError,
        "number.integer": EM.neiuIdError,
        "number.min": EM.neiuIdError,
        "number.max": EM.neiuIdError,
        "any.required": `"publisherId" ${EM.isRequired}`,
      }),
  }),

  createdOn: Joi.object({
    createdOn: Joi.number()
      .integer()
      .positive()
      .greater(len.minDate)
      .required()
      .messages({
        "number.base": EM.dateError,
        "number.positive": EM.dateError,
        "number.greater": EM.dateError,
        "number.empty": `"createdOn" ${EM.isRequired}`,
        "any.required": `"createdOn" ${EM.isRequired}`,
      }),
  }),

  subject: Joi.object({
    subject: Joi.string()
      .trim()
      .min(len.minSubjectLength)
      .max(len.maxSubjectLength)
      .required()
      .messages({
        "any.required": `"subject" ${EM.isRequired}`,
        "string.empty": `"subject" ${EM.isRequired}`,
        "string.min": EM.subjectError,
        "string.max": EM.subjectError,
        "string.base": EM.subjectError,
      }),
  }),

  content: Joi.object({
    content: Joi.string()
      .trim()
      .min(len.minContentLength)
      .max(len.maxContentLength)
      .required()
      .messages({
        "any.required": `"content" ${EM.isRequired}`,
        "string.empty": `"content" ${EM.isRequired}`,
        "string.min": EM.contentError,
        "string.max": EM.contentError,
        "string.base": EM.contentError,
      }),
  }),

  published: Joi.object({
    published: Joi.boolean()
      .required()
      .messages({
        "boolean.base": EM.booleanError,
        "any.required": `"published" ${EM.isRequired}`,
      }),
  }),
});
