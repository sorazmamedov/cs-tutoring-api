import {
  addTutor,
  editTutor,
  listTutors,
  removeTutor,
} from "../../use-cases/tutor";

import makeCreateTutor from "./create-tutor";
import makeDeleteTutor from "./delete-tutor";
import makeGetTutors from "./get-tutors";
import makeUpdateTutor from "./update-tutor";

const getTutors = makeGetTutors({ listTutors });
const createTutor = makeCreateTutor({ addTutor });
const updateTutor = makeUpdateTutor({ editTutor });
const deleteTutor = makeDeleteTutor({ removeTutor });

const tutorController = Object.freeze({
  getTutors,
  createTutor,
  updateTutor,
  deleteTutor,
});

export default tutorController;
export { getTutors, createTutor, updateTutor, deleteTutor };
