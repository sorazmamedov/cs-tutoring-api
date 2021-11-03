const errorMessages = {
  //errors
  idError: "Id has to be of length 12!",
  neiuIdError: "Neiu id must be a 6 digit number between 100000 and 999999!",
  firstnameError: "Firstname must be a string of length: min=2, max=30",
  lastnameError: "Lastname must be a string of length: min=2, max=30",
  dateError: "Must be a valid date!",
  courseIdError: "Course id is required!",
  courseNameError: "Course name must be a string and required!",
  instructorNameError: "Instructor name is required and has to be a string!",
  semesterIdError: "Semester id is required!",
  semesterNameError: "Semester name must be a string and required!",
  locationError: "Location is required and must be a string value!",
  booleanError: "Must be a boolean!",
  subjectError: "Must be a string of length: min=10 max=100 characters!",
  contentError: "Must be a string of length: min=10 max=1000 characters!",
  emailError: "Email must be in .edu (ex: johndoe@neiu.edu) domain!",
  academicYearError: "Year is required and must be a positive integer!",
  dayError: "Day must be a number between 0-6, 0-Sunday, 1-Monday and so on!",
  startEndHourError: "Hour must be a number between 6-22 (6am-10pm)!",
  sessionDurationError:
    "Session duration must be a number between 20-50 (minutes)!",
  //patterns
  statusPattern: /^(pending|sent|error)$/,
  // datePattern:

  //length of a field
  dateLength: 10,
  idLength: 12,
  neiuIdLength: 6,
  neiuIdStart: 100000,
  neiuIdEnd: 999999,
  minFirstnameLength: 2,
  maxFirstnameLength: 30,
  minLastnameLength: 2,
  maxLastnameLength: 30,
  minSubjectLength: 10,
  maxSubjectLength: 100,
  minContentLength: 10,
  maxContentLength: 1000,
  minLocationLength: 2,
  maxLocationLength: 30,
  minYear: 2020,
  minDate: 1577858400000, //(January 1, 2020)
  minDay: 0, //0-Sunday, 1-Monday etc.
  maxDay: 6, //6-Saturday etc. 0-6
  minStartEndHour: 6, //6am 24 hour format
  maxStartEndHour: 22, //10pm 24 hour format
  minSessionDuration: 20,
  maxSessionDuration: 50,
};
export default Object.freeze(errorMessages);
