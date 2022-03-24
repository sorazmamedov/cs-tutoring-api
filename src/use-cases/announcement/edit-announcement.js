import makeAnnouncement from "../../models/announcement";

export default function makeEditAnnouncement({ db }) {
  return async function editAnnouncement({ id, ...changes }) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    const existing = await db.findById({ id }, db.collections.announcement);
    if (!existing) {
      throw new RangeError("Announcement not found.");
    }

    const announcement = makeAnnouncement({ ...existing, ...changes });

    const updated = await db.update(
      {
        id: announcement.getId(),
        publisherId: announcement.getPublisherId(),
        semesterId: announcement.getSemesterId(),
        createdOn: new Date(announcement.getCreatedOn()),
        subject: announcement.getSubject(),
        content: announcement.getContent(),
        published: announcement.isPublished(),
      },
      db.collections.announcement
    );

    return { ...existing, ...updated };
  };
}
