export default function makeGetAnnouncements({ listAnnouncements }) {
  return async function getAnnouncements(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const announcements = await listAnnouncements({
        semesterId: httpRequest.query.semesterId,
        user: httpRequest.user,
      });
      return {
        headers,
        statusCode: 200,
        body: announcements,
      };
    } catch (e) {
      if (e.name === "RangeError") {
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
