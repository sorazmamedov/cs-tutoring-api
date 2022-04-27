export default function makeUpdateTimeslot({ editTimeslot, responseTxt }) {
  return async function updateTimeslot(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { booked, courseId } = httpRequest.body;
      const updated = await editTimeslot({
        id: httpRequest.params.id,
        user: httpRequest.user,
        booked,
        courseId,
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

      if (e?.message === responseTxt.accessDenied) {
        return {
          headers,
          statusCode: 403,
          body: {
            error: e.message,
          },
        };
      }

      if (e?.message === responseTxt.unauthorized) {
        return {
          headers,
          statusCode: 401,
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
