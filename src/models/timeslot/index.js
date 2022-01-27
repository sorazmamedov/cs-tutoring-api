import Id from "../../Id";
import buildMakeTimeSlot from "./timeslot";
import { timeSlotValidator } from "../../validator";

const makeTimeSlot = buildMakeTimeSlot({ Id, timeSlotValidator });

export default makeTimeSlot;
