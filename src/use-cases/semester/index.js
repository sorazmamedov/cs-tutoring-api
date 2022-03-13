import makeAddSemester from "./add-semester";
import makeEditSemester from "./edit-semester";
import makeListSemesters from "./list-semesters";
import makeGrabActiveSemester from "./grab-activeSemester";
import db from "../../data-access";

const addSemester = makeAddSemester({ db });
const editSemester = makeEditSemester({ db });
const listSemesters = makeListSemesters({ db });
const grabActiveSemester = makeGrabActiveSemester({ db });
const semesterService = Object.freeze({
  addSemester,
  editSemester,
  listSemesters,
  grabActiveSemester,
});

export default semesterService;
export { addSemester, editSemester, listSemesters, grabActiveSemester };
