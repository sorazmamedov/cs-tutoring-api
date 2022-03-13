import personSchema from "./person-schema";
import vs from "./validationSchemas";

export default personSchema.keys({
  activeSemesters: vs.activeSemesters,
});
