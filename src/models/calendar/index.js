import Id from "../../Id";
import buildMakeCalendar from "./calendar";
import { calendarValidator } from "../../validator";

const makeCalendar = buildMakeCalendar({ Id, calendarValidator });

export default makeCalendar;
