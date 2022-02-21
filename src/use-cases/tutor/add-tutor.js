import makeTutor from "../../models/tutor";
export default function makeAddTutor({ db }) {
  return async function addTutor(tutorInfo) {
    const tutor = makeTutor(tutorInfo);
    const exists = await db.findById(
      { id: tutor.getId() },
      db.collections.tutor
    );
    if (exists) {
      return exists;
    }

    return db.insert(
      {
        id: tutor.getId(),
        neiuId: tutor.getNeiuId(),
        firstName: tutor.getFirstName(),
        lastName: tutor.getLastName(),
        email: tutor.getEmail(),
        about: tutor.getAbout(),
      },
      db.collections.tutor
    );
  };
}
