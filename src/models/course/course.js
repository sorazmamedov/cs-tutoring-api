export default function buildMakeCourse({ Id, courseValidator }) {
  return function makeCourse({
    id = Id.makeId(),
    courseCode,
    courseName,
    semesterId,
    instructorName,
    instructorEmail,
  } = {}) {
    let { error } = courseValidator({
      id,
      courseCode,
      courseName,
      semesterId,
      instructorName,
      instructorEmail,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getCourseId: () => id,
      getCourseCode: () => courseCode,
      getCourseName: () => courseName,
      getSemesterId: () => semesterId,
      getInstructorName: () => instructorName,
      getInstructorEmail: () => instructorEmail,
    });
  };
}
