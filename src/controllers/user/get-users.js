export default function makeGetUsers({ listUsers, responseTxt }) {
  return async function getUsers(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const users = await listUsers({
        semesterId: httpRequest.query.semesterId,
        role: httpRequest.query.role,
        user: httpRequest.user
      });
      return {
        headers,
        statusCode: 200,
        body: users,
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

      if (e?.message === responseTxt.unauthorized) {
        return {
          headers,
          statusCode: 401,
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
