import makeAnnouncement from "./";
import { len, errMessages as EM } from "../../validator/validationMessages";

describe("announcement", () => {
  it("create announcement", () => {
    const evl = `"about" ${EM.noEmpty}`;
    const announcement = {
      announcementId: "sssddddddddd",
      publisherId: 453535,
      createdOn: 1577858400000,
      subject: "Serdarserdar",
      content: "razmam",
    };
    expect(() => makeAnnouncement(announcement)).toThrow(evl);
    // expect(() => makeTutor(admin)).not.toThrow();
  });
});
