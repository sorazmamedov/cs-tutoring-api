import makeAddCourse from "./add-course";
import makeEditCourse from "./edit-course";
import makeListCourses from "./list-courses";
import makeRemoveCourse from "./remove-course";
import db from "../../data-access";

const addCourse = makeAddCourse({ db });
const editCourse = makeEditCourse({ db });
const listCourses = makeListCourses({ db });
const removeCourse = makeRemoveCourse({ db });
const courseService = Object.freeze({
  addCourse,
  editCourse,
  listCourses,
  removeCourse,
});

export default courseService;
export { addCourse, editCourse, listCourses, removeCourse };
