export default function makeListUser({ db, Roles, responseTxt }) {
  return async function listUser({ id, email, user }) {
    if (!user || !user?.roles.includes(Roles.Admin)) {
      throw new Error(responseTxt.accessDenied);
    }

    if (!id && !email) {
      throw new Error(responseTxt.invalidId);
    }

    let userExists;

    //if user is student requesting tutr
    if (id) {
      userExists = await db.user.findById({ id });
    } else {
      userExists = await db.user.findByEmail({ email });
    }

    if (!userExists) {
      throw new RangeError(`User ${responseTxt.notFound}`);
    }

    return userExists;
  };
}
