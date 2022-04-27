export default function makeGetUser({ listUser, responseTxt }) {
  return async function getUser(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const user = await listUser({
        email: httpRequest.params.email,
        user: httpRequest.user,
      });
      return {
        headers,
        statusCode: 200,
        body: user,
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
