export default function buildMakeCourse({ courseValidator }) {
  return function makeCourse({
    courseId,
    courseName,
    semesterId,
    instructorName,
    instructorEmail,
  } = {}) {
    let { error } = courseValidator({
      courseId,
      courseName,
      semesterId,
      instructorName,
      instructorEmail,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getCourseId: () => courseId,
      getCourseName: () => courseName,
      getSemesterId: () => semesterId,
      getInstructorName: () => instructorName,
      getInstructorEmail: () => instructorEmail,
    });
  };
}
