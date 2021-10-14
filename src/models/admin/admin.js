export default function buildMakeAdmin({ Id, adminValidator }) {
  return function makeAdmin({
    id = Id.makeId(Id.size),
    neiuId,
    firstName,
    lastName,
    email,
  } = {}) {
    let { error } = adminValidator({ id, neiuId, firstName, lastName, email });
    if (error) throw new Error(error);

    return Object.freeze({
      getId: () => id,
      getNeiuId: () => neiuId,
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getEmail: () => email,
    });
  };
}
