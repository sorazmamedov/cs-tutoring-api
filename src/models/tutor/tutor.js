export default function buildMakeTutor({ Id, tutorValidator }) {
  return function makeTutor({
    id = Id.makeId(),
    neiuId,
    firstName,
    lastName,
    email,
    about,
    isActive = false,
    activeSemesters = [],
  } = {}) {
    let { error } = tutorValidator({
      id,
      neiuId,
      firstName,
      lastName,
      email,
      about,
      isActive,
      activeSemesters,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getId: () => id,
      getNeiuId: () => neiuId,
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getEmail: () => email,
      getAbout: () => about,
      getIsActive: () => isActive,
      getActiveSemesters: () => activeSemesters,
    });
  };
}
