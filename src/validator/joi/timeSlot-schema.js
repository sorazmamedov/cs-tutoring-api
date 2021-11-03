import { object, number, string, ref } from "joi";
import {
  dateLength,
  idLength,
  semesterIdError,
  dayError,
  minDay,
  maxDay,
  minStartEndHour,
  maxStartEndHour,
  startEndHourError,
  sessionDurationError,
} from "../validationMessages";

export default object().keys({
  slotId: string()
    .trim()
    .length(idLength)
    .required()
    .error(() => idError),
  scheduleId: string()
    .trim()
    .length(idLength)
    .required()
    .error(() => idError),
  slotDate: string()
    .trim()
    .length(dateLength)
    .required()
    .error(() => idError),
  sessionStart: string()
    .trim()
    .alphanum()
    .required()
    .error(() => semesterIdError),
  sessionEnd: number()
    .integer()
    .positive()
    .min(minDay)
    .max(maxDay)
    .required()
    .error(() => dayError),
  startHour: number()
    .integer()
    .positive()
    .min(minStartEndHour)
    .max(maxStartEndHour)
    .required()
    .error(() => startEndHourError),
});
