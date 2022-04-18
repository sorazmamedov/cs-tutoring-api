import responseTxt from "../../config/responseTxt";
import makeAnnouncement from "../../models/announcement";

export default function makeEditAnnouncement({ db }) {
  return async function editAnnouncement({ id, ...changes }) {
    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    const existing = await db.announcement.findById({ id });
    if (!existing) {
      throw new RangeError(`Announcement ${responseTxt.notFound}`);
    }

    const announcement = makeAnnouncement({ ...existing, ...changes });

    const updated = await db.announcement.update({
      id: announcement.getId(),
      publisherId: announcement.getPublisherId(),
      semesterId: announcement.getSemesterId(),
      createdOn: new Date(announcement.getCreatedOn()),
      subject: announcement.getSubject(),
      content: announcement.getContent(),
      published: announcement.isPublished(),
    });

    return { ...existing, ...updated };
  };
}
