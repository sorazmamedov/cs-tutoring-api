export default function makeUpdateUser({ editUser, responseTxt }) {
  return async function updateUser(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...changes } = httpRequest.body;
      const user = httpRequest.user;
      const updated = await editUser({
        id: httpRequest.params.id,
        user,
        ...changes,
      });
      return {
        headers,
        statusCode: 200,
        body: { ...updated },
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
        body: { error: e.message },
      };
    }
  };
}
