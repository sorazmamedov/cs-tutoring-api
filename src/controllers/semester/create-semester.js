export default function makeCreateSemester({ addSemester }) {
  return async function createSemester(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...semesterInfo } = httpRequest.body;
      const created = await addSemester(semesterInfo);

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
