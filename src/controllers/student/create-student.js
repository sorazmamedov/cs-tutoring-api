export default function makeCreateStudent({ addStudent }) {
  return async function createStudent(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { ...studentInfo } = httpRequest.body;
      const created = await addStudent(studentInfo);

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
