import Roles from "../../config/roles";

export default function makeListTutors({ db }) {
  return async function listTutors({ semesterId: id, user }) {
    const semesterExists = await db.findById({ id }, db.collections.semester);
    if (!semesterExists) {
      throw new RangeError("Semester not found.");
    }

    if (!semesterExists.active && !user?.roles.includes(Roles.Admin)) {
      throw new RangeError("You do not have permission to access the resource!")
    }

    if (user) {
      return await db.findAll(db.collections.tutor, { activeSemesters: id });
    }

    return await db.findAll(db.collections.tutor, { activeSemesters: id }, [
      "firstName",
      "lastName",
    ]);
  };
}
