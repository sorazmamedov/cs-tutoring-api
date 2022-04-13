export default function makeUpdateTimeslot({ editTimeslot }) {
  return async function updateTimeslot(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...timeslotInfo } = httpRequest.body;
      const updated = await editTimeslot({
        id: httpRequest.params.id,
        ...timeslotInfo,
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
