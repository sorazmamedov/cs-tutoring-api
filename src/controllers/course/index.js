import {
  addCourse,
  editCourse,
  listCourses,
} from "../../use-cases/course";

import makeCreateCourse from "./create-course";
import makeUpdateCourse from "./update-course";
import makeGetCourses from "./get-courses";

const createCourse = makeCreateCourse({ addCourse });
const updateCourse = makeUpdateCourse({ editCourse });
const getCourses = makeGetCourses({ listCourses });
const courseController = Object.freeze({
  createCourse,
  updateCourse,
  getCourses,
});

export default courseController;
export { createCourse, updateCourse, getCourses };
