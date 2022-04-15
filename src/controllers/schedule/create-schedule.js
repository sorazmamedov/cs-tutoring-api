export default function makeCreateSchedule({ addSchedule }) {
  return async function createSchedule(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...scheduleInfo } = httpRequest.body;
      const created = await addSchedule(scheduleInfo);

      return {
        headers,
        statusCode: 201,
        body: { ...created },
      };
    } catch (e) {
      console.log(e);
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
