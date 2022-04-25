import responseTxt from "../../config/responseTxt";

export default function makeDeleteCalendar({ removeCalendar }) {
  return async function deleteCalendar(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const calId = httpRequest.params.calId;
      const deleteAll = httpRequest.query?.deleteAll;
      const user = httpRequest.user;
      const deleted = await removeCalendar({ user, calId, deleteAll });

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
        body: { error: e.message },
      };
    }
  };
}
