export default function makeGetCourses({ listCourses }) {
  return async function getCourses(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const courses = await listCourses({
        semesterId: httpRequest.query.semesterId,
        searchTxt: httpRequest.query.searchTxt,
        user: httpRequest.user
      });
      return {
        headers,
        statusCode: 200,
        body: courses,
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
