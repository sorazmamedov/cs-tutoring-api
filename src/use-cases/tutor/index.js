import makeAddTutor from "./add-tutor";
import makeEditTutor from "./edit-tutor";
import makeListTutors from "./list-tutors";
import makeRemoveTutor from "./remove-tutor";
import db from "../../data-access";

const addTutor = makeAddTutor({ db });
const editTutor = makeEditTutor({ db });
const listTutors = makeListTutors({ db });
const removeTutor = makeRemoveTutor({ db });

const tutorService = Object.freeze({
  addTutor,
  editTutor,
  listTutors,
  removeTutor,
});

export default tutorService;
export { addTutor, editTutor, listTutors, removeTutor };
