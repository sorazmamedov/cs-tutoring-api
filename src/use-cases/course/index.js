import makeAddCourse from "./add-course";
import makeEditCourse from "./edit-course";
import makeListCourses from "./list-courses";
import makeRemoveCourse from "./remove-course";
import db from "../../data-access";
import responseTxt from "../../config/responseTxt";
import Roles from "../../config/roles";

const addCourse = makeAddCourse({ db, responseTxt });
const editCourse = makeEditCourse({ db, responseTxt });
const listCourses = makeListCourses({ db, Roles, responseTxt });
const removeCourse = makeRemoveCourse({ db, responseTxt });
const courseService = Object.freeze({
  addCourse,
  editCourse,
  listCourses,
  removeCourse,
});

export default courseService;
export { addCourse, editCourse, listCourses, removeCourse };
