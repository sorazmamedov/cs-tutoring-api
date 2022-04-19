export default function buildMakeAppointment({ Id, appointmentValidator }) {
  return function makeAppointment({
    id = Id.makeId(),
    slotId,
    tutorId,
    studentId,
    courseId,
    semesterId,
    start,
    end,
    report = "",
    canceled = false,
    noShow = false,
  } = {}) {
    let { error } = appointmentValidator({
      id,
      slotId,
      tutorId,
      studentId,
      courseId,
      start,
      semesterId,
      end,
      report,
      canceled,
      noShow,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getAppointmentId: () => id,
      getSlotId: () => slotId,
      getTutorId: () => tutorId,
      getStudentId: () => studentId,
      getCourseId: () => courseId,
      getSemesterId: () => semesterId,
      getStartDate: () => start,
      getEndDate: () => end,
      getReport: () => report,
      isCanceled: () => canceled,
      isNoShow: () => noShow,
      markCanceled: () => {
        canceled = true;
      },
      markNoShow: () => {
        noShow = true;
      },
    });
  };
}
