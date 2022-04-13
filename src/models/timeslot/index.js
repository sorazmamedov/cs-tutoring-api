import Id from "../../Id";
import buildMakeTimeslot from "./timeslot";
import { timeslotValidator } from "../../validator";

const makeTimeslot = buildMakeTimeslot({ Id, timeslotValidator });

export default makeTimeslot;
