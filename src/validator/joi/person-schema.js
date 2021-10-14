import { object, number, string } from "joi";

export default object().keys({
  id: string()
    .length(12)
    .required()
    .error(() => "id has to be of length 12"),
  neiuId: number()
    .min(100000)
    .max(999999)
    .required()
    .error(() => "Neiu ID must be a 6 digit number"),
  firstName: string()
    .trim()
    .required()
    .error(() => "firstname must be a string"),
  lastName: string()
    .trim()
    .required()
    .error(() => "lastname must be a string"),
  email: string()
    .trim()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 2,
      tlds: { allow: ["edu"] },
    })
    .required()
    .error(() => "Email must be in @neiu.edu domain"),
});
