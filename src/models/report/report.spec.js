import makeReport from "./";

describe("report", () => {
  it("create report", () => {
    const report = {
      reportId: "reportIddddd",
      tutorId: "453aaaaaa311",
      studentId: "012345678910",
      courseId: "somerandom",
      message: "some content about student",
      submittedOn: Date.now(),
      status: "sent",
    };
    expect(() => makeReport(report)).not.toThrow();
  });
});
