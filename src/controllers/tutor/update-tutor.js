export default function makeUpdateTutor({ editTutor }) {
  return async function updateTutor(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...tutorInfo } = httpRequest.body;
      const updated = await editTutor({
        id: httpRequest.params.id,
        ...tutorInfo,
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
