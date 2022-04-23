import dateFns from "../../../date";

export default async function handleNoShow({
  db,
  appointment,
  getCourseInfo,
  getUserInfo,
  noShow,
}) {
  if (noShow === appointment.noShow) {
    throw new Error("Nothing to change");
  }

  //setting to true is allowed after 15mins of start time
  if (noShow && !appointment.sent) {
    const allowedTime = dateFns.addMinutes(appointment.start, 15);
    const hasPassed = dateFns.isPast(allowedTime);
    if (!hasPassed) {
      throw new Error(
        `You can mark as a no show after ${dateFns.format(
          allowedTime,
          "h:mm bbb"
        )}`
      );
    }

    const updated = await db.appointment.update({
      ...appointment,
      noShow: true,
    });

    const studentPromise = getUserInfo(updated.studentId, db);
    const coursePromise = getCourseInfo(updated.courseId, db);
    const [student, course] = await Promise.all([
      studentPromise,
      coursePromise,
    ]);

    return {
      id: updated.id,
      slotId: updated.slotId,
      student,
      course,
      start: updated.start,
      end: updated.end,
      report: updated.report,
      noShow: updated.noShow,
    };
  }

  //allow to change the no show back to false only if the appt time has not passed
  const hasPassed = dateFns.isPast(appointment.end);
  if (hasPassed) {
    throw new Error("Appointment time has expired");
  }

  const updated = await db.appointment.update({
    ...appointment,
    noShow: false,
  });

  const studentPromise = getUserInfo(updated.studentId, db);
  const coursePromise = getCourseInfo(updated.courseId, db);
  const [student, course] = await Promise.all([studentPromise, coursePromise]);

  return {
    id: updated.id,
    slotId: updated.slotId,
    student,
    course,
    start: updated.start,
    end: updated.end,
    report: updated.report,
    noShow: updated.noShow,
  };
}
