import makeAppointment from "../../../models/appointment";

export default async function handleReport({
  db,
  appointment,
  getCourseInfo,
  getUserInfo,
  report,
  responseTxt
}) {
  if (appointment.sent) {
    throw new Error(responseTxt.accessDenied);
  }

  if (report === appointment.report) {
    throw new Error("Nothing to change");
  }

  const modified = makeAppointment({ ...appointment, report });

  const updated = await db.appointment.update({
    id: modified.getAppointmentId(),
    slotId: modified.getSlotId(),
    tutorId: modified.getTutorId(),
    studentId: modified.getStudentId(),
    courseId: modified.getCourseId(),
    semesterId: modified.getSemesterId(),
    start: modified.getStartDate(),
    end: modified.getEndDate(),
    canceled: modified.isCanceled(),
    noShow: modified.isNoShow(),
    report: modified.getReport(),
    sent: modified.isSent(),
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
    sent: updated.sent,
  };
}
