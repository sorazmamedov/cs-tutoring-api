import Id from "../../Id";
import buildMakeSemester from "./semester";
import { semesterValidator } from "../../validator";

const makeSemester = buildMakeSemester({ Id, semesterValidator });

export default makeSemester;
