export default function buildMakeReport({ Id, reportValidator }) {
  return function makeReport({
    reportId = Id.makeId(),
    tutorId,
    studentId,
    courseId,
    submittedOn = Date.now(),
    message,
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
      getreportId: () => reportId,
      getTutorId: () => tutorId,
      getStudentId: () => studentId,
      getStartDate: () => courseId,
      getSubmittedOn: () => submittedOn,
      getMessage: () => message,
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
