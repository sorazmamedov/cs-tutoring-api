import makeSchedule from "../../models/schedule";

export default function makeEditSchedule({ db }) {
  return async function editSchedule({ id, ...changes }) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    const existing = await db.findById({ id }, db.collections.schedule);
    if (!existing) {
      throw new RangeError("Schedule not found.");
    }

    const semesterExists = await db.findById(
      { id: changes.semesterId },
      db.collections.semester
    );
    if (!semesterExists) {
      throw new Error("You must supply valid semester id!");
    }
    const tutorExists = await db.findById(
      { id: changes.tutorId },
      db.collections.tutor
    );

    if (!tutorExists) {
      throw new Error("You must supply valid tutor id!");
    }

    const schedule = makeSchedule({ ...existing, ...changes });

    const updated = await db.update(
      {
        id: schedule.getScheduleId(),
        tutorId: schedule.getTutorId(),
        semesterId: schedule.getSemesterId(),
        day: schedule.getDay(),
        startHour: schedule.getStartHour(),
        endHour: schedule.getEndHour(),
        location: schedule.getLocation(),
        isActive: schedule.getIsActive(),
      },
      db.collections.schedule
    );

    return { ...existing, ...updated };
  };
}
