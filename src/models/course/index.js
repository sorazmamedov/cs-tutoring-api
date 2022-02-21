import Id from "../../Id";
import buildMakeCourse from "./course";
import { courseValidator } from "../../validator";

const makeCourse = buildMakeCourse({ Id, courseValidator });

export default makeCourse;
