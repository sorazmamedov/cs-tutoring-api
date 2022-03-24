import makeAddCalendar from "./add-calendar";
import makeEditCalendar from "./edit-calendar";
import makeListCalendars from "./list-calendars";
import makeRemoveCalendar from "./remove-calendar";
import db from "../../data-access";
import dateFns from "../../date";

const addCalendar = makeAddCalendar({ db, dateFns });
const editCalendar = makeEditCalendar({ db });
const listCalendars = makeListCalendars({ db });
const removeCalendar = makeRemoveCalendar({ db });
const calendarService = Object.freeze({
  addCalendar,
  editCalendar,
  listCalendars,
  removeCalendar,
});

export default calendarService;
export { addCalendar, editCalendar, listCalendars, removeCalendar };
