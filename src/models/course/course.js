export default function buildMakeCourse({ Id, courseValidator }) {
  return function makeCourse({
    id = Id.makeId(),
    section,
    courseName,
    semesterId,
    instructorName,
    instructorEmail,
  } = {}) {
    let { error } = courseValidator({
      id,
      section,
      courseName,
      semesterId,
      instructorName,
      instructorEmail,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getCourseId: () => id,
      getSection: () => section,
      getCourseName: () => courseName,
      getSemesterId: () => semesterId,
      getInstructorName: () => instructorName,
      getInstructorEmail: () => instructorEmail,
    });
  };
}
