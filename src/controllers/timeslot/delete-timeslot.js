export default function makeDeleteTimeslot({ removeTimeslot }) {
  return async function deleteTimeslot(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const user = httpRequest.user;
      const id = httpRequest.params.id;
      const reason = httpRequest.body.reason;

      const deleted = await removeTimeslot({ id, user, reason });

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
