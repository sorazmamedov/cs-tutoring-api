import Roles from "../../config/roles";

export default function makeListAnnouncements({ db }) {
  return async function listAnnouncements({ semesterId: id, user }) {
    const semesterExists = await db.findById({ id }, db.collections.semester);
    if (!semesterExists) {
      throw new Error("You must supply valid semester id!");
    }

    if (!semesterExists.active && !user?.roles.includes(Roles.Admin)) {
      throw new RangeError("You do not have a permission to the resource!");
    }

    if (user?.roles.includes(Roles.Admin)) {
      return await db.findAll(db.collections.announcement, { semesterId: id });
    }

    return await db.findAll(db.collections.announcement, {
      semesterId: id,
      published: true,
    });
  };
}
