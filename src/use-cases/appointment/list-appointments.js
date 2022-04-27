export default function makeListAppointments({ db, Roles, responseTxt }) {
  return async function listAppointments({ user, semesterId }) {
    if (!semesterId) {
      throw new Error(responseTxt.invalidSemesterId);
    }

    const semesterExists = await db.semester.findById({ id: semesterId });
    if (!semesterExists) {
      throw new RangeError(`Semester ${responseTxt.notFound}`);
    }

    const isAdmin = user?.roles.includes(Roles.Admin);
    if (!semesterExists.active && !isAdmin) {
      throw new Error(responseTxt.accessDenied);
    }

    const isTutor = user?.roles.includes(Roles.Tutor);

    let result = await db.appointment.findAll({
      semesterId,
      canceled: false,
      userId: user.id,
    });

    const userIds = {};
    const courseIds = {};

    result.forEach((item) => {
      if (item.tutorId === user.id) {
        if (!userIds[item.studentId]) {
          userIds[item.studentId] = "";
        }
      } else {
        if (!userIds[item.tutorId]) {
          userIds[item.tutorId] = "";
        }
      }

      if (!courseIds[item.courseId]) {
        courseIds[item.courseId] = "";
      }
    });

    const usersPromise = getUserInfo(userIds, db);
    const coursesPromise = getCourseInfo(courseIds, db);

    const [users, courses] = await Promise.all([usersPromise, coursesPromise])

    //remove fields depending on if id matches tutorId field or studentId
    const appointments = await result.map((item) => {
      if (item.tutorId === user.id) {
        return {
          id: item.id,
          slotId: item.slotId,
          student: users[item.studentId],
          course: courses[item.courseId].courseName,
          start: item.start,
          end: item.end,
          report: item.report,
          noShow: item.noShow,
          sent: item.sent,
        };
      } else {
        return {
          id: item.id,
          slotId: item.slotId,
          tutor: users[item.tutorId],
          course: courses[item.courseId].courseName,
          start: item.start,
          end: item.end,
          canceled: item.canceled,
        };
      }
    });

    return appointments;
  };
}

async function getUserInfo(userIds, db) {
  const users = {};
  for (const key in userIds) {
    users[key] = await db.user.findByIdAndProject({
      id: key,
      fields: ["firstName", "lastName"],
    });
  }

  return users;
}

async function getCourseInfo(courseIds, db) {
  const courses = {};
  for (const key in courseIds) {
    courses[key] = await db.course.findByIdAndProject({
      id: key,
      fields: ["courseName"],
    });
  }

  return courses;
}
