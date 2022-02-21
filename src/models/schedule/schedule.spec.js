import makeSchedule from "./";

describe("Schedule", () => {
  it("create schedule", () => {
    const schedule = {
      scheduleId: "reportIddddd",
      tutorId: "453aaaaaa311",
      semesterId: "Fall2021",
      day: 6,
      startHour: 12,
      endHour: 22,
      sessionDuration: 50,
    };
    expect(() => makeSchedule(schedule)).not.toThrow();
  });
});
