export default function makeUpdateAnnouncement({ editAnnouncement }) {
  return async function updateAnnouncement(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...announcementInfo } = httpRequest.body;
      const updated = await editAnnouncement({
        id: httpRequest.params.id,
        ...announcementInfo,
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
