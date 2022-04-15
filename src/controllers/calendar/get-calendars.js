export default function makeGetCalendars({ listCalendars }) {
  return async function getCalendars(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const calendars = await listCalendars({
        semesterId: httpRequest.query.semesterId,
        user: httpRequest.user,
        start: httpRequest.query.start,
        end: httpRequest.query.end
      });
      return {
        headers,
        statusCode: 200,
        body: calendars,
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
        body: {
          error: e.message,
        },
      };
    }
  };
}
