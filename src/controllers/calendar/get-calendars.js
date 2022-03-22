export default function makeGetCalendars({ listCalendars }) {
  return async function getCalendars(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const calendars = await listCalendars({
        semesterId: httpRequest.query.semesterId,
        tutorId: httpRequest.query.tutorId,
      });
      return {
        headers,
        statusCode: 200,
        body: calendars,
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
