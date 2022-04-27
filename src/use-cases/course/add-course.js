import makeCourse from "../../models/course";

export default function makeAddCourse({ db, responseTxt }) {
  return async function addCourse({ semesterId, courseInfo, coursesInfo }) {
    const semesterExists = await checkSemesterExistence(semesterId, db);
    if (!semesterExists) {
      throw new Error(responseTxt.invalidSemesterId);
    }
    if (coursesInfo && coursesInfo instanceof Array) {
      const courses = await Promise.all(
        coursesInfo.map(async (item) => {
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

      db.course.insertMany(courses);
      return { success: "Successfully saved!" };
    }

    const course = makeCourse({ ...courseInfo, semesterId });

    const exists = await db.course.findById({ id: course.getCourseId() });

    if (exists) {
      return exists;
    }

    return db.course.insert({
      id: course.getCourseId(),
      section: course.getSection(),
      courseName: course.getCourseName(),
      semesterId: course.getSemesterId(),
      instructorName: course.getInstructorName(),
      instructorEmail: course.getInstructorEmail(),
    });
  };
}

async function checkSemesterExistence(id, db) {
  const semesterExists = await db.semester.findById({ id });
  if (!semesterExists) {
    return false;
  }

  return semesterExists;
}

async function checkCourseExistence(course, db) {
  const exists = await db.course.findById({ id: course.getCourseId() });

  if (exists) {
    return exists;
  }

  return false;
}
