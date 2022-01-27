export default function buildMakeAnnouncement({ Id, announcementValidator }) {
  return function makeAnnouncement({
    announcementId = Id.makeId(),
    publisherId,
    createdOn = Date.now(),
    subject,
    content,
    published = false,
  } = {}) {
    let { error } = announcementValidator({
      announcementId,
      publisherId,
      createdOn,
      subject,
      content,
      published,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getAnnouncementId: () => announcementId,
      getPublisherId: () => publisherId,
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
