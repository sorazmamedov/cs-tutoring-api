export default function makeCreateCalendar({ addCalendar }) {
  return async function createCalendar(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const calendarInfo = httpRequest.body;
      const created = await addCalendar(calendarInfo);

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
