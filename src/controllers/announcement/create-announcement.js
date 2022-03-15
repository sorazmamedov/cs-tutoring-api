export default function makeCreateAnnouncement({ addAnnouncement }) {
  return async function createAnnouncement(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { ...announcementInfo } = httpRequest.body;
      const created = await addAnnouncement(announcementInfo);

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
