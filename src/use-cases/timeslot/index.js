import makeAddTimeslot from "./add-timeslot";
import makeEditTimeslot from "./edit-timeslot";
import makeListTimeslots from "./list-timeslots";
import makeRemoveTimeslot from "./remove-timeslot";
import makeRemoveTimeslots from "./remove-timeslots";
import db from "../../data-access";
import dateFns from "../../date";

const addTimeslot = makeAddTimeslot({ db, dateFns });
const editTimeslot = makeEditTimeslot({ db });
const listTimeslots = makeListTimeslots({ db });
const removeTimeslot = makeRemoveTimeslot({ db });
const removeTimeslots = makeRemoveTimeslots({ db });
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
