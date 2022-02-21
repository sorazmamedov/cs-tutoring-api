export default function makeGetAdmins({ listAdmins }) {
  return async function getAdmins(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    
    try {
      const admins = await listAdmins();
      return {
        headers,
        statusCode: 200,
        body: admins,
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
