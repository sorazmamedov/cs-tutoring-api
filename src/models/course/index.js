import buildMakeCourse from "./course";
import { courseValidator } from "../../validator";

const makeCourse = buildMakeCourse({ courseValidator });

export default makeCourse;
