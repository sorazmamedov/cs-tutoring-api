export default function makeCreateUser({ addUser }) {
  return async function createUser(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { ...userInfo } = httpRequest.body;
      const created = await addUser(userInfo);

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
