export default function buildMakeAnnouncement({ Id, announcementValidator }) {
  return function makeAnnouncement({
    id = Id.makeId(),
    publisherId,
    semesterId,
    createdOn = Date.now(),
    subject,
    content,
    published = false,
  } = {}) {
    let { error } = announcementValidator({
      id,
      publisherId,
      semesterId,
      createdOn,
      subject,
      content,
      published,
    });
    if (error) throw new Error(error);

    return Object.freeze({
      getId: () => id,
      getPublisherId: () => publisherId,
      getSemesterId: () => semesterId,
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
