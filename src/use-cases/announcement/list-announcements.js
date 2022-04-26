import responseTxt from "../../config/responseTxt";
import Roles from "../../config/roles";

export default function makeListAnnouncements({ db }) {
  return async function listAnnouncements({ semesterId, user }) {
    const semesterExists = await db.semester.findById({ id: semesterId });
    if (!semesterExists) {
      throw new Error(responseTxt.invalidSemesterId);
    }

    if (!semesterExists.active && !user?.roles.includes(Roles.Admin)) {
      throw new Error(responseTxt.accessDenied);
    }

    if (user?.roles.includes(Roles.Admin)) {
      return await db.announcement.findAll({ semesterId });
    }

    return await db.announcement.findAll({
      semesterId,
      published: true,
    });
  };
}
