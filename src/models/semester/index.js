import buildMakeSemester from "./semester";
import { semesterValidator } from "../../validator";

const makeSemester = buildMakeSemester({ semesterValidator });

export default makeSemester;
