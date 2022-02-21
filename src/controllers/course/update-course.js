export default function makeUpdateCourse({ editCourse }) {
  return async function updateCourse(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...courseInfo } = httpRequest.body;
      const updated = await editCourse({
        id: httpRequest.params.id,
        ...courseInfo,
      });
      return {
        headers,
        statusCode: 200,
        body: { ...updated },
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
