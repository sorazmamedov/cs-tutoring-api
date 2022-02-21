import makeAdmin from "./";
import Id from "../../Id";

describe("admin", () => {
  it("create admin test", () => {
    const admin = {
      id: Id.makeId(),
      neiuId: 455342,
      firstName: "Serdar",
      lastName: "razmam",
      email: "asd@neiu.edu",
    };
    expect(() => makeAdmin(admin)).not.toThrow();
  });
});
