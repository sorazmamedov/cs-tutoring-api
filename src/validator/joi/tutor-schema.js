import personSchema from "./user-schema";
import vs from "./validationSchemas";

export default personSchema.keys({
  activeSemesters: vs.activeSemesters,
});
