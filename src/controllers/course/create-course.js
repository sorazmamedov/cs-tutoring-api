export default function makeCreateCourse({ addCourse }) {
  return async function createCourse(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const courseInfo = httpRequest.body.course;
      const coursesInfo = httpRequest.body.courses;
      const semesterId = httpRequest.params.semesterId;
      const created = await addCourse({semesterId, courseInfo, coursesInfo});

      return {
        headers,
        statusCode: 201,
        body: { ...created },
      };
    } catch (e) {
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
}
