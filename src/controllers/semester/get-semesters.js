export default function makeGetSemesters({ listSemesters }) {
  return async function getSemesters(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const semesters = await listSemesters();
      return {
        headers,
        statusCode: 200,
        body: semesters,
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
