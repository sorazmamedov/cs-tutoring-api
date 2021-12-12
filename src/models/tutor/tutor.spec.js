import makeTutor from "./";

describe("tutor", () => {
  it("create tutor test", () => {
    const tutor = {
      id: "ssssssdddddd",
      neiuId: 453533,
      firstName: "Serdar",
      lastName: "razmam",
      email: "asd@neiu.edu",
    };
    expect(() => makeTutor(tutor)).not.toThrow();
  });
});
