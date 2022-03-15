import makeAnnouncement from "../../models/announcement";
export default function makeAddAnnouncement({ db }) {
  return async function addAnnouncement(announcementInfo) {
    const announcement = makeAnnouncement(announcementInfo);

    await checkSemesterExistence(announcement.getSemesterId(), db);
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
        publisherId: announcement.getPublisherId(),
        semesterId: announcement.getSemesterId(),
        createdOn: announcement.getCreatedOn(),
        subject: announcement.getSubject(),
        content: announcement.getContent(),
        published: announcement.isPublished(),
      },
      db.collections.announcement
    );
  };
}

async function checkSemesterExistence(id, db) {
  const semesterExists = await db.findById({ id }, db.collections.semester);
  if (!semesterExists) {
    throw new Error("You must supply valid semester id!");
  }

  return true;
}