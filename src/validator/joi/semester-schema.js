import { object, number, string, ref } from "joi";
import {
  semesterIdError,
  semesterNameError,
  minYear,
  academicYearError,
  minDate,
  dateError,
} from "../validationMessages";

export default object().keys({
  semesterId: string()
    .trim()
    .alphanum()
    .required()
    .error(() => semesterIdError),
  semesterName: string()
    .trim()
    .alphanum()
    .required()
    .error(() => semesterNameError),
  academicYear: number()
    .integer()
    .positive()
    .greater(minYear)
    .required()
    .error(() => academicYearError),
  startDate: number()
    .integer()
    .positive()
    .greater(minDate)
    .required()
    .error(() => dateError),
  endDate: number()
    .integer()
    .positive()
    .greater(ref("startDate"))
    .required()
    .error(() => dateError),
});
