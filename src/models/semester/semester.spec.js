import makeSemester from "./";

describe("Semester", () => {
  it("create semester", () => {
    const semester = {
      semesterId: "2asdad",
      semesterName: "Fall2021",
      academicYear: 2021,
      startDate: Date.now(),
      endDate: Date.now()+1,
    };
    expect(() => makeSemester(semester)).not.toThrow();
  });
});
