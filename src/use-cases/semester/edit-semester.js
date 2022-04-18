import responseTxt from "../../config/responseTxt";
import makeSemester from "../../models/semester";

export default function makeEditSemester({ db }) {
  return async function editSemester({ id, ...changes }) {
    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    const existing = await db.semester.findById({ id });
    if (!existing) {
      throw new RangeError(`Semester ${responseTxt.notFound}`);
    }

    const activeExists = await db.semester.find({ active: true });
    if (existing.active !== changes.active) {
      if (changes.active && activeExists) {
        throw new Error(
          `Only one active semester is allowed at any given time!\nCurrently active: ${activeExists.semesterName} ${activeExists.academicYear}`
        );
      }
    }

    const semester = makeSemester({ ...existing, ...changes });

    const updated = await db.semester.update({
      id: semester.getSemesterId(),
      semesterName: semester.getSemesterName(),
      academicYear: semester.getAcademicYear(),
      startDate: new Date(semester.getStartDate()),
      endDate: new Date(semester.getEndDate()),
      active: semester.isActive(),
    });

    return { ...existing, ...updated };
  };
}
