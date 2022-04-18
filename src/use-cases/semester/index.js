import makeAddSemester from "./add-semester";
import makeEditSemester from "./edit-semester";
import makeListSemesters from "./list-semesters";
import makeListActiveSemester from "./list-activeSemester";
import db from "../../data-access";

const addSemester = makeAddSemester({ db });
const editSemester = makeEditSemester({ db });
const listSemesters = makeListSemesters({ db });
const listActiveSemester = makeListActiveSemester({ db });
const semesterService = Object.freeze({
  addSemester,
  editSemester,
  listSemesters,
  listActiveSemester,
});

export default semesterService;
export { addSemester, editSemester, listSemesters, listActiveSemester };
