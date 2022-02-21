import {
  addSemester,
  editSemester,
  listSemesters,
} from "../../use-cases/semester";

import makeCreateSemester from "./create-semester";
import makeUpdateSemester from "./update-semester";
import makeGetSemesters from "./get-semesters";

const createSemester = makeCreateSemester({ addSemester });
const updateSemester = makeUpdateSemester({ editSemester });
const getSemesters = makeGetSemesters({ listSemesters });
const semesterController = Object.freeze({
  createSemester,
  updateSemester,
  getSemesters,
});

export default semesterController;
export { createSemester, updateSemester, getSemesters };
