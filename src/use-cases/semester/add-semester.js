import makeSemester from "../../models/semester";
export default function makeAddSemester({ db }) {
  return async function addSemester(semesterInfo) {
    const semester = makeSemester(semesterInfo);
    const exists = await db.findById(
      { id: semester.getSemesterId() }, 
      db.collections.semester
    );

    if (exists) {
      return exists;
    }

    return db.insert(
      {
        id: semester.getSemesterId(),
        semesterName: semester.getSemesterName(),
        academicYear: semester.getAcademicYear(),
        startDate: new Date(semester.getStartDate()),
        endDate: new Date(semester.getEndDate()),
        active: semester.isActive(),
      },
      db.collections.semester
    );
  };
}
