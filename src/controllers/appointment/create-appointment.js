export default function makeCreateAppointment({ addAppointment }) {
  return async function createAppointment(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const eventInfo = httpRequest.body;
      const created = await addAppointment(eventInfo);

      return {
        headers,
        statusCode: 201,
        body: { ...created },
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
