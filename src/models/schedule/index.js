import Id from "../../Id";
import buildMakeSchedule from "./schedule";
import { scheduleValidator } from "../../validator";

const makeSchedule = buildMakeSchedule({ Id, scheduleValidator });

export default makeSchedule;
