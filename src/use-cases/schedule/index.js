import makeAddSchedule from "./add-schedule";
import makeEditSchedule from "./edit-schedule";
import makeListSchedules from "./list-schedules";
import db from "../../data-access";

const addSchedule = makeAddSchedule({ db });
const editSchedule = makeEditSchedule({ db });
const listSchedules = makeListSchedules({ db });
const scheduleService = Object.freeze({
  addSchedule,
  editSchedule,
  listSchedules,
});

export default scheduleService;
export { addSchedule, editSchedule, listSchedules };
