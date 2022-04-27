export default function makeGetTimeslots({ listTimeslots, responseTxt }) {
  return async function getTimeslots(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const timeslots = await listTimeslots({
        user: httpRequest.user,
        semesterId: httpRequest.query.semesterId,
        start: httpRequest.query.start,
        end: httpRequest.query.end,
      });
      return {
        headers,
        statusCode: 200,
        body: timeslots,
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
