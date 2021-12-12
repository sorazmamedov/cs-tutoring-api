import makeAdmin from "./";

describe("admin", () => {
  it("create admin test", () => {
    const admin = {
      id: "ssssssdddddd",
      neiuId: 453553,
      firstName: "Serdar",
      lastName: "razmam",
      email: "asd@neiu.edu",
    };
    expect(() => makeAdmin(admin)).not.toThrow();
  });
});
