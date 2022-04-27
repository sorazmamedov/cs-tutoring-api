import {
  addSemester,
  editSemester,
  listSemesters,
  listActiveSemester,
} from "../../use-cases/semester";

import makeCreateSemester from "./create-semester";
import makeUpdateSemester from "./update-semester";
import makeGetSemesters from "./get-semesters";
import makeGetActiveSemester from "./get-activeSemester";

const createSemester = makeCreateSemester({ addSemester });
const getActiveSemester = makeGetActiveSemester({ listActiveSemester });
const getSemesters = makeGetSemesters({ listSemesters });
const updateSemester = makeUpdateSemester({ editSemester });
const semesterController = Object.freeze({
  createSemester,
  updateSemester,
  getSemesters,
  getActiveSemester,
});

export default semesterController;
export { createSemester, updateSemester, getSemesters, getActiveSemester };
