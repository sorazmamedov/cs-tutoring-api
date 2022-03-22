export default function makeUpdateCalendar({ editCalendar }) {
  return async function updateCalendar(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...calendarInfo } = httpRequest.body;
      const updated = await editCalendar({
        id: httpRequest.params.id,
        ...calendarInfo,
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

      return {
        headers,
        statusCode: 400,
        body: { error: e.message },
      };
    }
  };
}
