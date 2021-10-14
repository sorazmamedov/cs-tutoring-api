import personSchema from "./person-schema";
import { object } from "joi";

export default object().keys({
  ...personSchema,
});
