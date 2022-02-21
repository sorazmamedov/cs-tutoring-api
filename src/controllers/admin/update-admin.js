export default function makeUpdateAdmin({ editAdmin }) {
  return async function updateAdmin(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...adminInfo } = httpRequest.body;
      const updated = await editAdmin({
        id: httpRequest.params.id,
        ...adminInfo,
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
