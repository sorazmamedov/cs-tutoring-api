import {
  addCalendar,
  editCalendar,
  listCalendars,
  removeCalendar,
} from "../../use-cases/calendar";

import makeCreateCalendar from "./create-calendar";
import makeUpdateCalendar from "./update-calendar";
import makeGetCalendars from "./get-calendars";
import makeDeleteCalendar from "./delete-calendar";

const createCalendar = makeCreateCalendar({ addCalendar });
const updateCalendar = makeUpdateCalendar({ editCalendar });
const getCalendars = makeGetCalendars({ listCalendars });
const deleteCalendar = makeDeleteCalendar({ removeCalendar });
const calendarController = Object.freeze({
  createCalendar,
  updateCalendar,
  getCalendars,
  deleteCalendar,
});

export default calendarController;
export { createCalendar, updateCalendar, getCalendars, deleteCalendar };
