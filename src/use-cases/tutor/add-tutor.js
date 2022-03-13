import makeTutor from "../../models/tutor";
export default function makeAddTutor({ db }) {
  return async function addTutor(tutorInfo) {
    const tutor = makeTutor(tutorInfo);
    const exists = await db.find(
      {$or: [{ id: tutor.getId()}, {email: tutor.getEmail()}]},
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
        isActive: tutor.getIsActive(),
        activeSemesters: tutor.getActiveSemesters(),
      },
      db.collections.tutor
    );
  };
}
