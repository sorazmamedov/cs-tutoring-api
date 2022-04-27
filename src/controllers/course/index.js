import {
  addCourse,
  editCourse,
  listCourses,
  removeCourse,
} from "../../use-cases/course";

import makeCreateCourse from "./create-course";
import makeDeleteCourse from "./delete-course";
import makeGetCourses from "./get-courses";
import makeUpdateCourse from "./update-course";

const createCourse = makeCreateCourse({ addCourse });
const deleteCourse = makeDeleteCourse({ removeCourse });
const getCourses = makeGetCourses({ listCourses });
const updateCourse = makeUpdateCourse({ editCourse });
const courseController = Object.freeze({
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
});

export default courseController;
export { createCourse, updateCourse, getCourses, deleteCourse };
