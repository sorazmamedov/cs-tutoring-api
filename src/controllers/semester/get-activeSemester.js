export default function makeGetActiveSemester({ grabActiveSemester }) {
  return async function getActiveSemester(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const semester = await grabActiveSemester();
      return {
        headers,
        statusCode: 200,
        body: semester,
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
