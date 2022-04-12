export default function buildMakeUser({ Id, userValidator }) {
  return function makeUser({
    id = Id.makeId(),
    neiuId = "",
    firstName,
    lastName,
    pronouns = "",
    email,
    about = "",
    isActive = false,
    roles,
    picture,
    activeSemesters = [],
  } = {}) {
    let { error } = userValidator({
      id,
      neiuId,
      firstName,
      lastName,
      pronouns,
      email,
      about,
      isActive,
      roles,
      picture,
      activeSemesters,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getId: () => id,
      getNeiuId: () => neiuId,
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getPronouns: () => pronouns,
      getEmail: () => email,
      getAbout: () => about,
      getIsActive: () => isActive,
      getRoles: () => roles,
      getPicture: () => picture,
      getActiveSemesters: () => activeSemesters,
    });
  };
}
