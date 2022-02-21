import makeAnnouncement from "./";
import Id from "../../Id";

describe("announcement", () => {
  it("create announcement", () => {
    const announcement = {
      announcementId: Id.makeId(),
      publisherId: Id.makeId(),
      createdOn: Date.now(),
      subject: "Change of hours",
      content:
        "Due to the change of Thomas' tutoring hours I am announcing that there will not be any this coming week.",
      published: true,
    };
    expect(() => makeAnnouncement(announcement)).not.toThrow();
  });
});
