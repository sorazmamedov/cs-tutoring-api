import {
  addSchedule,
  listSchedules,
  editSchedule,
} from "../../use-cases/schedule";

import makeCreateSchedule from "./create-schedule";
import makeGetSchedules from "./get-schedules";
import makeUpdateSchedule from "./update-schedule";

const createSchedule = makeCreateSchedule({ addSchedule });
const getSchedules = makeGetSchedules({ listSchedules });
const updateSchedule = makeUpdateSchedule({ editSchedule });
const scheduleController = Object.freeze({
  createSchedule,
  getSchedules,
  updateSchedule,
});

export default scheduleController;
export { createSchedule, updateSchedule, getSchedules };
