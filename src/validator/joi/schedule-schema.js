// import { object, number, string, ref } from "joi";
// import {
//   idLength,
//   semesterIdError,
//   dayError,
//   minDay,
//   maxDay,
//   minStartEndHour,
//   maxStartEndHour,
//   startEndHourError,
//   sessionDurationError,
// } from "../validationMessages";

// export default object().keys({
//   scheduleId: string()
//     .trim()
//     .length(idLength)
//     .required()
//     .error(() => idError),
//   tutorId: string()
//     .trim()
//     .length(idLength)
//     .required()
//     .error(() => idError),
//   semesterId: string()
//     .trim()
//     .alphanum()
//     .required()
//     .error(() => semesterIdError),
//   day: number()
//     .integer()
//     .positive()
//     .min(minDay)
//     .max(maxDay)
//     .required()
//     .error(() => dayError),
//   startHour: number()
//     .integer()
//     .positive()
//     .min(minStartEndHour)
//     .max(maxStartEndHour)
//     .required()
//     .error(() => startEndHourError),
//   endHour: number()
//     .integer()
//     .positive()
//     .greater(ref("startHour"))
//     .max(maxStartEndHour)
//     .required()
//     .error(() => startEndHourError),
//   sessionDuration: number()
//     .integer()
//     .positive()
//     .min(minSessionDuration)
//     .max(maxSessionDuration)
//     .required()
//     .error(() => sessionDurationError),
// });
