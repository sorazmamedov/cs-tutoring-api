export default function makeGetTutors({ listTutors }) {
  return async function getTutors(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const tutors = await listTutors({
        semesterId: httpRequest.query.semesterId,
        user: httpRequest.user,
      });
      return {
        headers,
        statusCode: 200,
        body: tutors,
      };
    } catch (e) {
      if (e.name === "RangeError") {
        return {
          headers,
          statusCode: 403,
          body: {
            error: e.message,
          },
        };
      }

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
