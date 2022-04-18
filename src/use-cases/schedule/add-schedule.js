import responseTxt from "../../config/responseTxt";
import makeSchedule from "../../models/schedule";

export default function makeAddSchedule({ db }) {
  return async function addSchedule(scheduleInfo) {
    const schedule = makeSchedule(scheduleInfo);

    const semesterExists = await db.semester.findById({
      id: schedule.getSemesterId(),
    });
    if (!semesterExists) {
      throw new Error(responseTxt.invalidSemesterId);
    }

    const tutorExists = await db.user.findById({ id: schedule.getTutorId() });
    if (!tutorExists) {
      throw new Error(responseTxt.invalidId);
    }

    const exists = await db.schedule.findById({ id: schedule.getScheduleId() });

    if (exists) {
      return exists;
    }

    return db.schedule.insert({
      id: schedule.getScheduleId(),
      tutorId: schedule.getTutorId(),
      semesterId: schedule.getSemesterId(),
      day: schedule.getDay(),
      startHour: schedule.getStartHour(),
      endHour: schedule.getEndHour(),
      location: schedule.getLocation(),
      isActive: schedule.getIsActive(),
    });
  };
}
