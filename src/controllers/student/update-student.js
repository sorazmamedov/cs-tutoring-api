export default function makeUpdateStudent({ editStudent }) {
  return async function updateStudent(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...studentInfo } = httpRequest.body;
      const updated = await editStudent({
        id: httpRequest.params.id,
        ...studentInfo,
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
