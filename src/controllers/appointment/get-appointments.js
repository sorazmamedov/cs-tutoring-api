import responseTxt from "../../config/responseTxt";

export default function makeGetAppointments({ listAppointments }) {
  return async function getAppointments(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const appointments = await listAppointments({
        user: httpRequest.user,
        semesterId: httpRequest.query.semesterId,
      });
      return {
        headers,
        statusCode: 200,
        body: appointments,
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
