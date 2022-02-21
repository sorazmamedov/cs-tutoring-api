export default function makeGetStudents({ listStudents }) {
  return async function getStudents(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const students = await listStudents();
      return {
        headers,
        statusCode: 200,
        body: students,
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
