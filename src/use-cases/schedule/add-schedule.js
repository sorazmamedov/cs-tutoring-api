import makeSchedule from "../../models/schedule";
export default function makeAddSchedule({ db }) {
  return async function addSchedule(scheduleInfo) {
    const schedule = makeSchedule(scheduleInfo);

    const semesterExists = await db.findById(
      { id: schedule.getSemesterId() },
      db.collections.semester
    );
    if (!semesterExists) {
      throw new Error("You must supply valid semester id!");
    }
    const tutorExists = await db.findById(
      { id: schedule.getTutorId() },
      db.collections.tutor
    );
    if (!tutorExists) {
      throw new Error("You must supply valid tutor id!");
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
