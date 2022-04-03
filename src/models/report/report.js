export default function buildMakeReport({ Id, reportValidator }) {
  return function makeReport({
    id = Id.makeId(),
    tutorId,
    studentId,
    courseId,
    submittedOn = Date.now(),
    message,
    status = "pending",
  } = {}) {
    let { error } = reportValidator({
      id,
      tutorId,
      studentId,
      courseId,
      submittedOn,
      message,
      status,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getReportId: () => id,
      getTutorId: () => tutorId,
      getStudentId: () => studentId,
      getCourseId: () => courseId,
      getSubmittedOn: () => submittedOn,
      getContent: () => content,
      getStatus: () => status,
      setStatusAsPending: () => {
        status = "pending";
      },
      setStatusAsSent: () => {
        status = "sent";
      },
      setStatusAsError: () => {
        status = "error";
      },
    });
  };
}
