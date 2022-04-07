import Roles from "../../config/roles";

export default function makeListSchedules({ db }) {
  return async function listSchedules({ semesterId: id, user }) {
    const semesterExists = await db.findById({ id }, db.collections.semester);
    if (!semesterExists) {
      throw new Error("You must supply valid semester id!");
    }

    if (!semesterExists.active && !user?.roles.includes(Roles.Admin)) {
      throw new RangeError("You do not have a permission to the resource!");
    }

    if (user?.roles.includes(Roles.Admin)) {
      return await db.findAll(db.collections.schedule, {
        semesterId: id,
      });
    }

    if (user) {
      return await db.findAll(db.collections.schedule, {
        semesterId: id,
        isActive: true,
      });
    }

    const result = await db.findAll(
      db.collections.schedule,
      {
        semesterId: id,
        isActive: true,
      },
      ["tutorId", "day", "startHour", "endHour"]
    );
    
    if (result && result.length !== 0) {
      const schedules = await Promise.all(
        result.map(async (item) => {
          const id = item.tutorId;
          const tutor = await db.findById({ id }, db.collections.tutor);
          const schedule = {
            ...item,
            tutor: {
              firstName: tutor.firstName,
              lastName: tutor.lastName,
            },
          };
          return schedule;
        })
      );
      return schedules;
    }

    return [];
  };
}
