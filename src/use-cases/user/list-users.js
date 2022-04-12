import Roles from "../../config/roles";
import responseTxt from "../../config/responseTxt";

export default function makeListUsers({ db }) {
  return async function listUsers({ semesterId: id, role, user }) {
    if (!user) {
      throw new Error(responseTxt.unauthorized);
    }
    const isAdmin = user?.roles.includes(Roles.Admin);

    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    const queryRole = parseInt(role);

    //if role is undefined or not parsable to int or not defined in Roles
    if (
      role === undefined ||
      !queryRole ||
      !Object.values(Roles).includes(queryRole)
    ) {
      throw new Error(responseTxt.invalidRoleType);
    }

    const semesterExists = await db.findById({ id }, db.collections.semester);
    if (!semesterExists) {
      throw new RangeError(`Semester ${responseTxt.notFound}`);
    }

    if (!semesterExists.active && !isAdmin) {
      throw new Error(responseTxt.accessDenied);
    }

    if (user) {
      return await db.findAll(db.collections.user, {
        activeSemesters: id,
        roles: queryRole,
      });
    }

    // return await db.findAll(db.collections.user, { activeSemesters: id }, [
    //   "firstName",
    //   "lastName",
    // ]);
  };
}
