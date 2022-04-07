export default function makeGetSchedules({ listSchedules }) {
  return async function getSchedules(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const schedules = await listSchedules({
        semesterId: httpRequest.query.semesterId,
        user: httpRequest.user,
      });
      return {
        headers,
        statusCode: 200,
        body: schedules,
      };
    } catch (e) {
      if (e.name === "RangeError") {
        return {
          headers,
          statusCode: 403,
          body: {
            error: e.message,
          },
        };
      }

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
