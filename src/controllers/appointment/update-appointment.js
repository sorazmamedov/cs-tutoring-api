import responseTxt from "../../config/responseTxt";

export default function makeUpdateAppointment({ editAppointment }) {
  return async function updateAppointment(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { report, canceled, noShow } = httpRequest.body;
      const updated = await editAppointment({
        id: httpRequest.params.apptId,
        user: httpRequest.user,
        report,
        canceled,
        noShow,
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
