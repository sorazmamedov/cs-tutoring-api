import makeSemester from "../../models/semester";

export default function makeAddSemester({ db }) {
  return async function addSemester(semesterInfo) {
    const semester = makeSemester(semesterInfo);
    const exists = await db.semester.findById({ id: semester.getSemesterId() });

    if (exists) {
      return exists;
    }

    return db.semester.insert({
      id: semester.getSemesterId(),
      semesterName: semester.getSemesterName(),
      academicYear: semester.getAcademicYear(),
      startDate: new Date(semester.getStartDate()),
      endDate: new Date(semester.getEndDate()),
      active: semester.isActive(),
    });
  };
}
