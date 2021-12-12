import makeStudent from "./";

describe("student", () => {
  it("create student test", () => {
    const student = {
      id: "ssssssdddddd",
      neiuId: 453533,
      firstName: "Serdar",
      lastName: "razmam",
      email: "asd@neiu.edu",
    };
    expect(() => makeStudent(student)).not.toThrow();
  });
});
