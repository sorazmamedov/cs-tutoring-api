import makeSemester from "./";

describe("Semester", () => {
  it("create semester", () => {
    const semester = {
      semesterId: "Fall2021",
      semesterName: "Fall",
      academicYear: 2022,
      startDate: Date.now(),
      endDate: Date.now() + 1,
    };
    expect(() => makeSemester(semester)).not.toThrow();
  });
});
