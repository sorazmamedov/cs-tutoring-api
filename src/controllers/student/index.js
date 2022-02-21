import {
  addStudent,
  editStudent,
  listStudents,
  removeStudent,
} from "../../use-cases/student";

import makeCreateStudent from "./create-student";
import makeDeleteStudent from "./delete-student";
import makeGetStudents from "./get-students";
import makeUpdateStudent from "./update-student";

const getStudents = makeGetStudents({ listStudents });
const createStudent = makeCreateStudent({ addStudent });
const updateStudent = makeUpdateStudent({ editStudent });
const deleteStudent = makeDeleteStudent({ removeStudent });

const studentController = Object.freeze({
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
});

export default studentController;
export { getStudents, createStudent, updateStudent, deleteStudent };
