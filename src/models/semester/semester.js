export default function buildMakeSemester({ Id, semesterValidator }) {
  return function makeSemester({
    semesterId = Id.makeId(),
    semesterName,
    academicYear,
    startDate,
    endDate,
  } = {}) {
    let { error } = semesterValidator({
      semesterId,
      semesterName,
      academicYear,
      startDate,
      endDate,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getSemesterId: () => semesterId,
      getSemesterName: () => semesterName,
      getAcademicYear: () => academicYear,
      getStartDate: () => startDate,
      getEndDate: () => endDate,
    });
  };
}
