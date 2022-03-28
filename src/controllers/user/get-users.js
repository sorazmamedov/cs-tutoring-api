export default function makeGetUsers({ listUsers }) {
  return async function getUsers(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const users = await listUsers();
      return {
        headers,
        statusCode: 200,
        body: users,
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
