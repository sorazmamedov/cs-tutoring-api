import makeAnnouncement from "./";

describe("announcement", () => {
  it("create announcement", () => {
    const announcement = {
      announcementId: "SerdarSerdar",
      publisherId: "453aaaaaa311",
      createdOn: 1577858400001,
      subject: "Serdarserdar",
      content: "ljvgjchchchchhchc",
      published: true,
    };
    expect(() => makeAnnouncement(announcement)).not.toThrow();
  });
});
