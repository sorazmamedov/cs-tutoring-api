import {
  addCourse,
  editCourse,
  listCourses,
  removeCourse,
} from "../../use-cases/course";

import makeCreateCourse from "./create-course";
import makeUpdateCourse from "./update-course";
import makeGetCourses from "./get-courses";
import makeDeleteCourse from "./delete-course";

const createCourse = makeCreateCourse({ addCourse });
const updateCourse = makeUpdateCourse({ editCourse });
const getCourses = makeGetCourses({ listCourses });
const deleteCourse = makeDeleteCourse({ removeCourse });
const courseController = Object.freeze({
  createCourse,
  updateCourse,
  getCourses,
  deleteCourse,
});

export default courseController;
export { createCourse, updateCourse, getCourses, deleteCourse };
