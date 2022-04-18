import responseTxt from "../../config/responseTxt";
import makeSchedule from "../../models/schedule";

export default function makeEditSchedule({ db }) {
  return async function editSchedule({ id, ...changes }) {
    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    const existing = await db.schedule.findById({ id });
    if (!existing) {
      throw new RangeError(`Schedule ${responseTxt.notFound}`);
    }

    const schedule = makeSchedule({ ...existing, ...changes });

    const updated = await db.schedule.update({
      id: schedule.getScheduleId(),
      tutorId: schedule.getTutorId(),
      semesterId: schedule.getSemesterId(),
      day: schedule.getDay(),
      startHour: schedule.getStartHour(),
      endHour: schedule.getEndHour(),
      location: schedule.getLocation(),
      isActive: schedule.getIsActive(),
    });

    return { ...existing, ...updated };
  };
}
