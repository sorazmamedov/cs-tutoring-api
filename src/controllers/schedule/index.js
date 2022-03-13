import {
  addSchedule,
  editSchedule,
  listSchedules,
} from "../../use-cases/schedule";

import makeCreateSchedule from "./create-schedule";
import makeUpdateSchedule from "./update-schedule";
import makeGetSchedules from "./get-schedules";

const createSchedule = makeCreateSchedule({ addSchedule });
const updateSchedule = makeUpdateSchedule({ editSchedule });
const getSchedules = makeGetSchedules({ listSchedules });
const scheduleController = Object.freeze({
  createSchedule,
  updateSchedule,
  getSchedules,
});

export default scheduleController;
export { createSchedule, updateSchedule, getSchedules };
