// import { object, string } from "joi";
// import {
//   semesterIdError,
//   courseIdError,
//   courseNameError,
//   instructorNameError,
//   emailError,
// } from "../validationMessages";

// export default object.keys({
//   courseId: string()
//     .trim()
//     .required()
//     .error(() => courseIdError),
//   courseName: string()
//     .trim()
//     .required()
//     .error(() => courseNameError),
//   semesterId: string()
//     .trim()
//     .alphanum()
//     .required()
//     .error(() => semesterIdError),
//   instructorName: string()
//     .required()
//     .error(() => instructorNameError),
//   instructorEmail: string()
//     .trim()
//     .email({
//       minDomainSegments: 2,
//       maxDomainSegments: 2,
//       tlds: { allow: ["edu"] },
//     })
//     .error(() => emailError),
// });
