export default function buildMakeAnnouncement({ Id, announcementValidator }) {
  return function makeAnnouncement({
    announcementId = Id.makeId(Id.size),
    creatorId,
    createdOn = Date.now(),
    subject,
    content,
    published = false,
  } = {}) {
    let { error } = announcementValidator({
      announcementId,
      creatorId,
      createdOn,
      subject,
      content,
      published,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getAnnouncementId: () => announcementId,
      getCreatorId: () => creatorId,
      getCreatedOn: () => createdOn,
      getSubject: () => subject,
      getContent: () => content,
      isPublished: () => published,
      publish: () => {
        published = true;
      },
      unPublish: () => {
        published = false;
      },
    });
  };
}
