export default function buildMakeAppointment({ Id, appointmentValidator }) {
  return function makeAppointment({
    appointmentId = Id.makeId(),
    tutorId,
    studentId,
    courseId,
    appointmentDate,
    location,
    canceled = false,
    noShow = false,
    comment,
  } = {}) {
    let { error } = appointmentValidator({
      appointmentId,
      tutorId,
      studentId,
      courseId,
      appointmentDate,
      location,
      canceled,
      noShow,
      comment,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getAppointmentId: () => appointmentId,
      getTutorId: () => tutorId,
      getStudentId: () => studentId,
      getCourseId: () => courseId,
      getAppointmentDate: () => appointmentDate,
      getLocation: () => location,
      isCanceled: () => canceled,
      isNoShow: () => noShow,
      getComment: () => comment,
      markCanceled: () => {
        canceled = true;
      },
      markNoShow: () => {
        noShow = true;
      },
    });
  };
}
