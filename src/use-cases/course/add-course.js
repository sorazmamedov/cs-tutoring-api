import responseTxt from "../../config/responseTxt";
import makeCourse from "../../models/course";
export default function makeAddCourse({ db }) {
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

      db.insertMany(courses, db.collections.course);
      return { success: "Successfully saved!" };
    }

    const course = makeCourse({ ...courseInfo, semesterId });

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
    return false;
  }

  return semesterExists;
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
