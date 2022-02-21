export default function makeGetTutors({ listTutors }) {
  return async function getTutors(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const tutors = await listTutors();
      return {
        headers,
        statusCode: 200,
        body: tutors,
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
