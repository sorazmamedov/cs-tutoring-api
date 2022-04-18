import responseTxt from "../../config/responseTxt";

export default function makeRemoveAnnouncement({ db }) {
  return async function removeAnnouncement({ id }) {
    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    const announcementToDelete = await db.announcement.findById({ id });
    if (!announcementToDelete) {
      throw new RangeError(`Announcement ${responseTxt.notFound}`);
    }

    return {
      deletedCount: await db.announcement.remove(announcementToDelete),
      message: "announcement deleted.",
    };
  };
}
