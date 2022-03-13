import makeCourse from "../../models/course";
export default function makeAddCourse({ db }) {
  return async function addCourse(courseInfo) {
    if (courseInfo?.data) {
      await checkSemesterExistence(courseInfo.semesterId, db);
      const semesterId = courseInfo.semesterId;
      const courses = await Promise.all(
        courseInfo.data.map(async (item) => {
          const course = makeCourse({ ...item, semesterId });
          const exists = await checkCourseExistence(course, db);
          if (exists) {
            throw new Error(
              "Some or all of the provided courses already exist!"
            );
          }

          return {
            id: course.getCourseId(),
            section: course.getSection(),
            courseName: course.getCourseName(),
            semesterId: course.getSemesterId(),
            instructorName: course.getInstructorName(),
            instructorEmail: course.getInstructorEmail(),
          };
        })
      );

      db.insertMany(courses, db.collections.course);
      return { success: "Successfully saved!" };
    }

    const course = makeCourse(courseInfo);
    const semesterExists = await db.findById(
      { id: course.getSemesterId() },
      db.collections.semester
    );
    if (!semesterExists) {
      throw new Error("You must supply valid semester id!");
    }

    const exists = await db.findById(
      { id: course.getCourseId() },
      db.collections.course
    );

    if (exists) {
      return exists;
    }

    return db.insert(
      {
        id: course.getCourseId(),
        section: course.getSection(),
        courseName: course.getCourseName(),
        semesterId: course.getSemesterId(),
        instructorName: course.getInstructorName(),
        instructorEmail: course.getInstructorEmail(),
      },
      db.collections.course
    );
  };
}

async function checkSemesterExistence(id, db) {
  const semesterExists = await db.findById({ id }, db.collections.semester);
  if (!semesterExists) {
    throw new Error("You must supply valid semester id!");
  }

  return true;
}

async function checkCourseExistence(course, db) {
  const exists = await db.findById(
    { id: course.getCourseId() },
    db.collections.course
  );

  if (exists) {
    return exists;
  }

  return false;
}
