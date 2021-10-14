import { object, string } from "joi";
import personSchema from "./person-schema";

export default object().keys({
  ...personSchema,
  about: string().trim(),
});
