export default function buildMakeSemester({ Id, semesterValidator }) {
  return function makeSemester({
    id = Id.makeId(),
    semesterName,
    academicYear,
    startDate,
    endDate,
    active = false,
  } = {}) {
    let { error } = semesterValidator({
      id,
      semesterName,
      academicYear,
      startDate,
      endDate,
      active,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getSemesterId: () => id,
      getSemesterName: () => semesterName,
      getAcademicYear: () => academicYear,
      getStartDate: () => startDate,
      getEndDate: () => endDate,
      isActive: () => active,
      markActive: () => (active = true),
      unmarkActive: () => (active = false),
    });
  };
}
