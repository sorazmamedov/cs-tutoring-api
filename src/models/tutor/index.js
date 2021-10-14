import { Id } from "../../Id";
import buildMakeTutor from "./tutor";
import { tutorValidator } from "../../validator";

const makeTutor = buildMakeTutor({ Id, tutorValidator });

export default makeTutor;
