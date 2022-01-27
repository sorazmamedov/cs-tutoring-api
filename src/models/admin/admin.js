export default function buildMakeAdmin({ Id, adminValidator }) {
  return function makeAdmin({
    id = Id.makeId(),
    neiuId,
    firstName,
    lastName,
    email,
    about,
  } = {}) {
    let { error } = adminValidator({
      id,
      neiuId,
      firstName,
      lastName,
      email,
      about,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getId: () => id,
      getNeiuId: () => neiuId,
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getEmail: () => email,
      getAbout: () => about,
    });
  };
}
