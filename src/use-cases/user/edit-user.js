import makeUser from "../../models/user";
import responseTxt from "../../config/responseTxt";

const allowedDuringLogin = ["firstName", "lastName", "picture"];
const changeNotAllowed = ["id", "email"];

export default function makeEditUser({ db, Roles }) {
  return async function editUser({ id, user, ...changes }) {
    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    const isAdmin = user?.roles.includes(Roles.Admin);

    //id and user.id must match
    if (!isAdmin && user && id !== user.id) {
      throw new Error(responseTxt.accessDenied);
    }

    const changesKeys = Object.keys(changes);

    //changes should not include email or id
    if (changesKeys.some((prop) => changeNotAllowed.includes(prop))) {
      throw new Error(responseTxt.accessDenied);
    }

    //if no signed in user: Properties allowed to change are
    //the ones in allowedDuringLogin array. To keep updated to match
    //with what Google has.
    if (user && changesKeys.some((prop) => allowedDuringLogin.includes(prop))) {
      throw new Error(responseTxt.accessDenied);
    }

    //Only admin is allowed to change isActive and activeSemesters state
    if (
      !isAdmin &&
      (changesKeys.includes("isActive") ||
        changesKeys.includes("activeSemesters"))
    ) {
      throw new Error(responseTxt.accessDenied);
    }

    const existing = await db.findById({ id }, db.collections.user);
    if (!existing) {
      throw new RangeError(`User ${responseTxt.notFound}`);
    }

    const modified = makeUser({ ...existing, ...changes });

    const updated = await db.update(
      {
        id: modified.getId(),
        neiuId: modified.getNeiuId(),
        firstName: modified.getFirstName(),
        lastName: modified.getLastName(),
        pronouns: modified.getPronouns(),
        email: modified.getEmail(),
        about: modified.getAbout(),
        isActive: modified.getIsActive(),
        roles: modified.getRoles(),
        activeSemesters: modified.getActiveSemesters(),
      },
      db.collections.user
    );

    return { ...existing, ...updated };
  };
}
