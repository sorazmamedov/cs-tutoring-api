export default function makeListUsers({ db, Roles, responseTxt }) {
  return async function listUsers({ semesterId, role, user }) {
    if (!user) {
      throw new Error(responseTxt.unauthorized);
    }

    if (!semesterId) {
      throw new Error(responseTxt.invalidSemesterId);
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

    const semesterExists = await db.semester.findById({ id: semesterId });
    if (!semesterExists) {
      throw new RangeError(`Semester ${responseTxt.notFound}`);
    }

    const isAdmin = user?.roles.includes(Roles.Admin);
    const isTutor = user?.roles.includes(Roles.Tutor);

    if (!semesterExists.active && !isAdmin) {
      throw new Error(responseTxt.accessDenied);
    }

    if (isAdmin) {
      return await db.user.findAll({
        activeSemesters: semesterId,
        roles: queryRole,
      });
    }

    if (queryRole === Roles.Tutor) {
      return await db.user.findAll({
        isActive: true,
        activeSemesters: semesterId,
        roles: queryRole,
      });
    }

    throw new Error(responseTxt.accessDenied);
  };
}
