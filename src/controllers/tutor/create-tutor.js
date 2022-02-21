export default function makeCreateTutor({ addTutor }) {
  return async function createTutor(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { ...tutorInfo } = httpRequest.body;
      const created = await addTutor(tutorInfo);

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
