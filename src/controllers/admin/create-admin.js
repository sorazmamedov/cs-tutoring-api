export default function makeCreateAdmin({ addAdmin }) {
  return async function createAdmin(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...adminInfo } = httpRequest.body;
      const created = await addAdmin(adminInfo);

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
