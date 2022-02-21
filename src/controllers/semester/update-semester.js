export default function makeUpdateSemester({ editSemester }) {
  return async function updateSemester(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...semesterInfo } = httpRequest.body;
      const updated = await editSemester({
        id: httpRequest.params.id,
        ...semesterInfo,
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
