import makeSemester from "../../models/semester";

export default function makeEditSemester({ db }) {
  return async function editSemester({ id, ...changes }) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    const existing = await db.findById({ id }, db.collections.semester);
    if (!existing) {
      throw new RangeError("Semester not found.");
    }

    const activeExists = await db.find(
      { active: true },
      db.collections.semester
    );
    if (existing.active !== changes.active) {
      if (changes.active && activeExists) {
        throw new Error(
          `Only one active semester is allowed at any given time!\nCurrently active: ${activeExists.semesterName} ${activeExists.academicYear}`
        );
      }
    }

    const semester = makeSemester({ ...existing, ...changes });
    const updated = await db.update(
      {
        id: semester.getSemesterId(),
        semesterName: semester.getSemesterName(),
        academicYear: semester.getAcademicYear(),
        startDate: semester.getStartDate(),
        endDate: semester.getEndDate(),
        active: semester.isActive(),
      },
      db.collections.semester
    );

    return { ...existing, ...updated };
  };
}
