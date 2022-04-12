import responseTxt from "../../config/responseTxt";

export default function makeGetTutors({ listUser }) {
  return async function getTutors(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const tutors = await listUser({
        email: httpRequest.params.email,
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
          statusCode: 404,
          body: {
            error: e.message,
          },
        };
      }

      if (e?.message === responseTxt.accessDenied) {
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
