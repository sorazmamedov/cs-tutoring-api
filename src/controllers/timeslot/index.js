import responseTxt from "../../config/responseTxt";
import {
  addTimeslot,
  editTimeslot,
  listTimeslots,
  removeTimeslot,
} from "../../use-cases/timeslot";

import makeCreateTimeslot from "./create-timeslot";
import makeUpdateTimeslot from "./update-timeslot";
import makeGetTimeslots from "./get-timeslots";
import makeDeleteTimeslot from "./delete-timeslot";

const createTimeslot = makeCreateTimeslot({ addTimeslot });
const deleteTimeslot = makeDeleteTimeslot({ removeTimeslot });
const getTimeslots = makeGetTimeslots({ listTimeslots, responseTxt });
const updateTimeslot = makeUpdateTimeslot({ editTimeslot, responseTxt });
const timeslotController = Object.freeze({
  createTimeslot,
  updateTimeslot,
  getTimeslots,
  deleteTimeslot,
});

export default timeslotController;
export { createTimeslot, updateTimeslot, getTimeslots, deleteTimeslot };
