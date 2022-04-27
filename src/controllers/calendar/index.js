import responseTxt from "../../config/responseTxt";
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

const createCalendar = makeCreateCalendar({ addCalendar, responseTxt });
const deleteCalendar = makeDeleteCalendar({ removeCalendar, responseTxt });
const getCalendars = makeGetCalendars({ listCalendars, responseTxt });
const updateCalendar = makeUpdateCalendar({ editCalendar });
const calendarController = Object.freeze({
  createCalendar,
  deleteCalendar,
  getCalendars,
  updateCalendar,
});

export default calendarController;
export { createCalendar, deleteCalendar, getCalendars, updateCalendar };
