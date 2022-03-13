import makeAnnouncement from "../../models/announcement";
export default function makeAddAnnouncement({ db }) {
  return async function addAnnouncement(announcementInfo) {
    const announcement = makeAnnouncement(announcementInfo);
    const exists = await db.findById(
      { id: announcement.getId() },
      db.collections.announcement
    );
    if (exists) {
      return exists;
    }

    return db.insert(
      {
        id: announcement.getId(),
        neiuId: announcement.getNeiuId(),
        firstName: announcement.getFirstName(),
        lastName: announcement.getLastName(),
        email: announcement.getEmail(),
        about: announcement.getAbout(),
      },
      db.collections.admin
    );
  };
}
