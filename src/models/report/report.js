export default function buildMakeReport({ Id, reportValidator }) {
  return function makeReport({
    reportId = Id.makeId(),
    tutorId,
    studentId,
    courseId,
    submittedOn = Date.now(),
    content,
    status = "pending",
  } = {}) {
    let { error } = reportValidator({
      reportId,
      tutorId,
      studentId,
      courseId,
      submittedOn,
      message,
      status,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getReportId: () => reportId,
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
