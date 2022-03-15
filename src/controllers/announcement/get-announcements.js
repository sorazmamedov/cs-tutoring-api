export default function makeGetAnnouncements({ listAnnouncements }) {
  return async function getAnnouncements(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const announcements = await listAnnouncements({
        semesterId: httpRequest.query.semesterId,
      });
      return {
        headers,
        statusCode: 200,
        body: announcements,
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
