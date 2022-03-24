import makeAddTimeSlot from "./add-timeSlot";
// import makeEditTimeSlot from "./edit-timeSlot";
// import makeListTimeSlots from "./list-timeSlots";
import makeRemoveTimeSlot from "./remove-timeSlot";
import db from "../../data-access";
import dateFns from "../../date";

const addTimeSlot = makeAddTimeSlot({ db, dateFns });
// const editTimeSlot = makeEditTimeSlot({ db });
// const listTimeSlots = makeListTimeSlots({ db });
const removeTimeSlot = makeRemoveTimeSlot({ db });
const timeSlotService = Object.freeze({
  addTimeSlot,
  // editTimeSlot,
  // listTimeSlots,
  removeTimeSlot,
});

export default timeSlotService;
export {
  addTimeSlot,
  // editTimeSlot, listTimeSlots,
  removeTimeSlot,
};
