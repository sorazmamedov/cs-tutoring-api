export default function makeCreateTimeslot({ addTimeslot }) {
  return async function createTimeslot(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const eventInfo = httpRequest.body;
      const created = await addTimeslot(eventInfo);

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
