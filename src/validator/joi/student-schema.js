import { object } from "joi";
import personSchema from "./person-schema";

export default object().keys({
  ...personSchema,
});
