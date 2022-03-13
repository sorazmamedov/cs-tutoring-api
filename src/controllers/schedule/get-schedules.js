export default function makeGetSchedules({ listSchedules }) {
  return async function getSchedules(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const schedules = await listSchedules({
        semesterId: httpRequest.query.semesterId,
      });
      return {
        headers,
        statusCode: 200,
        body: schedules,
      };
    } catch (e) {
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
