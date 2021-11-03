import { object, number, string } from "joi";
import {
  idLength,
  idError,
  neiuIdError,
  neiuIdStart,
  neiuIdEnd,
  minFirstnameLength,
  maxFirstnameLength,
  minLastnameLength,
  maxLastnameLength,
  firstnameError,
  lastnameError,
  emailError,
  minContentLength,
  maxContentLength,
  contentError,
} from "../validationMessages";

export default object().keys({
  id: string()
    .trim()
    .length(idLength)
    .required()
    .error(() => idError),
  neiuId: number()
    .integer()
    .positive()
    .min(neiuIdStart)
    .max(neiuIdEnd)
    .required()
    .error(() => neiuIdError),
  firstName: string()
    .trim()
    .min(minFirstnameLength)
    .max(maxFirstnameLength)
    .required()
    .error(() => firstnameError),
  lastName: string()
    .trim()
    .min(minLastnameLength)
    .max(maxLastnameLength)
    .required()
    .error(() => lastnameError),
  email: string()
    .trim()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 2,
      tlds: { allow: ["edu"] },
    })
    .required()
    .error(() => emailError),
  about: string()
    .trim()
    .min(minContentLength)
    .max(maxContentLength)
    .error(() => contentError),
});
