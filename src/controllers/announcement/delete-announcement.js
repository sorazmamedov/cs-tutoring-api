export default function makeDeleteAnnouncement({ removeAnnouncement }) {
  return async function deleteAnnouncement(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const id = httpRequest.params.id;
      const deleted = await removeAnnouncement({ id });

      return {
        headers,
        statusCode: 200,
        body: { ...deleted },
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
