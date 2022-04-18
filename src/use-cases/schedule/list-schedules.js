import Roles from "../../config/roles";
import responseTxt from "../../config/responseTxt";

export default function makeListSchedules({ db }) {
  return async function listSchedules({ semesterId: id, user }) {
    const semesterExists = await db.semester.findById({ id });
    if (!semesterExists) {
      throw new Error(responseTxt.invalidId);
    }

    const isAdmin = user?.roles.includes(Roles.Admin);

    //if the semester is not active ACCESS is not permitted, unless the user is an Admin
    if (!semesterExists.active && !isAdmin) {
      throw new Error(responseTxt.accessDenied);
    }

    //If user=Admin then send all schedules
    if (isAdmin) {
      return await db.schedule.findAll({
        semesterId: id,
      });
    }

    //If any user then send only activated schedules
    if (user) {
      return await db.schedule.findAll({
        semesterId: id,
        isActive: true,
      });
    }

    //If NO signed in user then only send activated schedules with
    //4 fields = [day, startHour, endHour, tutor: {firstName, lastName}]
    const result = await db.schedule.findAll(
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
          const tutor = await db.user.findById({ id });
          const schedule = {
            day: item.day,
            startHour: item.startHour,
            endHour: item.endHour,
            tutor: `${tutor.firstName} ${tutor.lastName}`,
          };
          return schedule;
        })
      );
      return schedules;
    }

    return [];
  };
}
