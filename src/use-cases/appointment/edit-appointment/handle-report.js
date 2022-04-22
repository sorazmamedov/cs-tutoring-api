import makeAppointment from "../../../models/appointment";
import responseTxt from "../../../config/responseTxt";

export default async function handleReport({
  db,
  appointment,
  getCourseInfo,
  getUserInfo,
  report,
}) {
  if (appointment.sent) {
    throw new Error(responseTxt.accessDenied);
  }

  if (report === appointment.report) {
    throw new Error("Nothing to change")
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

  const student = await getUserInfo(updated.studentId, db);
  const course = await getCourseInfo(updated.courseId, db);

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
