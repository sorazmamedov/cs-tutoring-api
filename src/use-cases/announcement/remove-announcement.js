export default function makeRemoveAnnouncement({ db }) {
  return async function removeAnnouncement({ id }) {
    if (!id) {
      throw new Error("You must supply a valid id!");
    }

    const announcementToDelete = await db.findById({ id }, db.collections.announcement);
    if (!announcementToDelete) {
      throw new RangeError("Announcement not found.");
    }

    return {
      deletedCount: await db.remove(announcementToDelete, db.collections.announcement),
      message: "announcement deleted.",
    };
  };
}
