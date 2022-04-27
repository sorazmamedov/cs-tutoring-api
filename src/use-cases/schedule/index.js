import makeAddSchedule from "./add-schedule";
import makeEditSchedule from "./edit-schedule";
import makeListSchedules from "./list-schedules";
import db from "../../data-access";
import responseTxt from "../../config/responseTxt";
import Roles from "../../config/roles";

const addSchedule = makeAddSchedule({ db, responseTxt });
const editSchedule = makeEditSchedule({ db, responseTxt });
const listSchedules = makeListSchedules({ db, Roles, responseTxt });
const scheduleService = Object.freeze({
  addSchedule,
  editSchedule,
  listSchedules,
});

export default scheduleService;
export { addSchedule, editSchedule, listSchedules };
