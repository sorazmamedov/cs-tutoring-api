import Roles from "../../config/roles";
import responseTxt from "../../config/responseTxt";

export default function makeListUser({ db }) {
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
      userExists = await db.findById({ id }, db.collections.user);
    } else {
      userExists = await db.findByEmail({ email }, db.collections.user);
    }

    if (!userExists) {
      throw new RangeError(`User ${responseTxt.notFound}`);
    }

    return userExists;
  };
}
