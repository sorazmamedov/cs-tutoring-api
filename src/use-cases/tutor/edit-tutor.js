import makeTutor from "../../models/tutor";
export default function makeEditTutor({ db }) {
  return async function editTutor({ id, ...changes } = {}) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    if (!changes.about) {
      throw new Error('You must supply "about"');
    }

    const existing = await db.findById({ id }, db.collections.tutor);
    if (!existing) {
      throw new RangeError("Tutor not found.");
    }
    const tutor = makeTutor({ ...existing, ...changes });

    const updated = await db.update(
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

    return { ...existing, ...updated };
  };
}
