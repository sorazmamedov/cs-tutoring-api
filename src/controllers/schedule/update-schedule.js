export default function makeUpdateSchedule({ editSchedule }) {
  return async function updateSchedule(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...scheduleInfo } = httpRequest.body;
      const updated = await editSchedule({
        id: httpRequest.params.id,
        ...scheduleInfo,
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
