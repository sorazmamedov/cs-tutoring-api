import makeAnnouncement from "../../models/announcement";

export default function makeAddAnnouncement({ db, responseTxt }) {
  return async function addAnnouncement(announcementInfo) {
    const announcement = makeAnnouncement(announcementInfo);

    await checkSemesterExistence(announcement.getSemesterId(), db, responseTxt);
    const exists = await db.announcement.findById({ id: announcement.getId() });
    if (exists) {
      return exists;
    }

    return db.announcement.insert({
      id: announcement.getId(),
      publisherId: announcement.getPublisherId(),
      semesterId: announcement.getSemesterId(),
      createdOn: new Date(announcement.getCreatedOn()),
      subject: announcement.getSubject(),
      content: announcement.getContent(),
      published: announcement.isPublished(),
    });
  };
}

async function checkSemesterExistence(id, db, responseTxt) {
  const semesterExists = await db.semester.findById({ id });
  if (!semesterExists) {
    throw new Error(responseTxt.invalidSemesterId);
  }

  return true;
}
