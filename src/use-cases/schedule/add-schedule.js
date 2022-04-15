import responseTxt from "../../config/responseTxt";
import makeSchedule from "../../models/schedule";
export default function makeAddSchedule({ db }) {
  return async function addSchedule(scheduleInfo) {
    const schedule = makeSchedule(scheduleInfo);

    const semesterExists = await db.findById(
      { id: schedule.getSemesterId() },
      db.collections.semester
    );
    if (!semesterExists) {
      throw new Error(responseTxt.invalidSemesterId);
    }
    const tutorExists = await db.findById(
      { id: schedule.getTutorId() },
      db.collections.user
    );
    if (!tutorExists) {
      throw new Error(responseTxt.invalidId);
    }

    const exists = await db.findById(
      { id: schedule.getScheduleId() },
      db.collections.schedule
    );

    if (exists) {
      return exists;
    }

    return db.insert(
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
  };
}
