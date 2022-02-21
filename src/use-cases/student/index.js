import makeAddStudent from "./add-student";
import makeEditStudent from "./edit-student";
import makeListStudents from "./list-students";
import makeRemoveStudent from "./remove-student";
import db from "../../data-access";

const addStudent = makeAddStudent({ db });
const editStudent = makeEditStudent({ db });
const listStudents = makeListStudents({ db });
const removeStudent = makeRemoveStudent({ db });

const studentService = Object.freeze({
  addStudent,
  editStudent,
  listStudents,
  removeStudent,
});

export default studentService;
export { addStudent, editStudent, listStudents, removeStudent };
