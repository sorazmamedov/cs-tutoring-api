export default function makeCreateCalendar({ addCalendar }) {
  return async function createCalendar(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const eventInfo = httpRequest.body;
      const user = httpRequest.user;
      const created = await addCalendar({ tutorId: user?.id, ...eventInfo });

      return {
        headers,
        statusCode: 201,
        body: { ...created },
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
