export default function buildMakeStudent({ Id, studentValidator }) {
  return function makeStudent({
    id = Id.makeId(Id.size),
    neiuId,
    firstName,
    lastName,
    email,
    about,
  } = {}) {
    let { error } = studentValidator({
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
