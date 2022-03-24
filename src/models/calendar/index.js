import Id from "../../Id";
import buildMakeCalendar from "./calendar";
import buildMakeEvent from "./event";
import { calendarValidator, eventValidator } from "../../validator";

const makeCalendar = buildMakeCalendar({ Id, calendarValidator });
const makeEvent = buildMakeEvent({ Id, eventValidator });

export default makeCalendar;
export { makeEvent };
