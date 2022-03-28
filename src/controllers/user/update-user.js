export default function makeUpdateUser({ editUser }) {
  return async function updateUser(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...userInfo } = httpRequest.body;
      const updated = await editUser({
        id: httpRequest.params.id,
        ...userInfo,
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

      return {
        headers,
        statusCode: 400,
        body: { error: e.message },
      };
    }
  };
}
