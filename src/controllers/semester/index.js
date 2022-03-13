import {
  addSemester,
  editSemester,
  listSemesters,
  grabActiveSemester,
} from "../../use-cases/semester";

import makeCreateSemester from "./create-semester";
import makeUpdateSemester from "./update-semester";
import makeGetSemesters from "./get-semesters";
import makeGetActiveSemester from "./get-activeSemester";

const createSemester = makeCreateSemester({ addSemester });
const updateSemester = makeUpdateSemester({ editSemester });
const getSemesters = makeGetSemesters({ listSemesters });
const getActiveSemester = makeGetActiveSemester({ grabActiveSemester });
const semesterController = Object.freeze({
  createSemester,
  updateSemester,
  getSemesters,
  getActiveSemester,
});

export default semesterController;
export { createSemester, updateSemester, getSemesters, getActiveSemester };
