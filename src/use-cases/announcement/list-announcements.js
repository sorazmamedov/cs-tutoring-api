import responseTxt from "../../config/responseTxt";
import Roles from "../../config/roles";

export default function makeListAnnouncements({ db }) {
  return async function listAnnouncements({ semesterId: id, user }) {
    const semesterExists = await db.semester.findById({ id });
    if (!semesterExists) {
      throw new Error(responseTxt.invalidSemesterId);
    }

    if (!semesterExists.active && !user?.roles.includes(Roles.Admin)) {
      throw new Error(responseTxt.accessDenied);
    }

    if (user?.roles.includes(Roles.Admin)) {
      return await db.announcement.findAll({ semesterId: id });
    }

    return await db.announcement.findAll({
      semesterId: id,
      published: true,
    });
  };
}
