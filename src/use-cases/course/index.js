import makeAddCourse from "./add-course";
import makeEditCourse from "./edit-course";
import makeListCourses from "./list-courses";
import db from "../../data-access";

const addCourse = makeAddCourse({ db });
const editCourse = makeEditCourse({ db });
const listCourses = makeListCourses({ db });
const courseService = Object.freeze({
  addCourse,
  editCourse,
  listCourses,
});

export default courseService;
export { addCourse, editCourse, listCourses };
