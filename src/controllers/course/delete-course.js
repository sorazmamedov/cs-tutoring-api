export default function makeDeleteCourse({ removeCourse }) {
  return async function deleteCourse(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const id = httpRequest.params.id;
      const deleted = await removeCourse({ id });

      return {
        headers,
        statusCode: 200,
        body: { ...deleted },
      };
    } catch (e) {
      if (e.name === "RangeError") {
        return {
          headers,
          statusCode: 404,
          body: {
            error: e.message,
          },
        };
      }

      return {
        headers,
        statusCode: 400,
        body: { error: e.message },
      };
    }
  };
}
