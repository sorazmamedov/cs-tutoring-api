import makeAddCalendar from "./add-calendar";
import makeEditCalendar from "./edit-calendar";
import makeListCalendars from "./list-calendars";
import makeRemoveCalendar from "./remove-calendar";
import db from "../../data-access";
import dateFns from "../../date";
import responseTxt  from "../../config/responseTxt";

const addCalendar = makeAddCalendar({ db, dateFns, responseTxt });
const editCalendar = makeEditCalendar({ db, responseTxt });
const listCalendars = makeListCalendars({ db, responseTxt });
const removeCalendar = makeRemoveCalendar({ db, responseTxt });
const calendarService = Object.freeze({
  addCalendar,
  editCalendar,
  listCalendars,
  removeCalendar,
});

export default calendarService;
export { addCalendar, editCalendar, listCalendars, removeCalendar };
