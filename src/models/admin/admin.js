export default function buildMakeAdmin({ Id, adminValidator }) {
  return function makeAdmin({
    id = Id.makeId(),
    neiuId,
    firstName,
    lastName,
    email,
    about,
    isActive,
  } = {}) {
    let { error } = adminValidator({
      id,
      neiuId,
      firstName,
      lastName,
      email,
      about,
      isActive,
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
    });
  };
}
