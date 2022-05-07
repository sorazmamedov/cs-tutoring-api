import makeAddTimeslot from "./add-timeslot";
import makeEditTimeslot from "./edit-timeslot";
import makeListTimeslots from "./list-timeslots";
import makeRemoveTimeslot from "./remove-timeslot";
import makeRemoveTimeslots from "./remove-timeslots";
import db from "../../data-access";
import dateFns from "../../date";
import Roles from "../../config/roles";
import responseTxt from "../../config/responseTxt";

const addTimeslot = makeAddTimeslot({ db, dateFns });
const editTimeslot = makeEditTimeslot({ db, dateFns, Roles, responseTxt });
const listTimeslots = makeListTimeslots({ db, Roles, responseTxt });
const removeTimeslot = makeRemoveTimeslot({
  db,
  dateFns,
  Roles,
  responseTxt,
});
const removeTimeslots = makeRemoveTimeslots({ db, responseTxt });
const timeslotService = Object.freeze({
  addTimeslot,
  editTimeslot,
  listTimeslots,
  removeTimeslot,
  removeTimeslots,
});

export default timeslotService;
export {
  addTimeslot,
  editTimeslot,
  listTimeslots,
  removeTimeslot,
  removeTimeslots,
};
