import Id from "../../Id";
import buildMakeStudent from "./student";
import { studentValidator } from "../../validator";

const makeStudent = buildMakeStudent({ Id, studentValidator });

export default makeStudent;
