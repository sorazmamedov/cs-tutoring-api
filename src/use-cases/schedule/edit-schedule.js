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
