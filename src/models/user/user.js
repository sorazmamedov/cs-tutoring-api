export default function buildMakeUser({ Id, userValidator }) {
  return function makeUser({
    id = Id.makeId(),
    neiuId,
    firstName,
    lastName,
    email,
    about,
    active = false,
    roles,
    picture,
  } = {}) {
    let { error } = userValidator({
      id,
      neiuId,
      firstName,
      lastName,
      email,
      about,
      active,
      roles,
      picture,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getId: () => id,
      getNeiuId: () => neiuId,
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getEmail: () => email,
      getAbout: () => about,
      isActive: () => active,
      getRoles: () => roles,
      getPicture: () => picture,
    });
  };
}
