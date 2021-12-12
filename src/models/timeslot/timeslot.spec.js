import makeTimeSlot from "./";

describe("Timeslot", () => {
  it("create timeslot", () => {
    const timeslot = {
      slotId: "timeslotIddd",
      scheduleId: "aaaaaaaaaaaa",
      slotDate: Date.now(),
      startHour: 6,
      endHour: 22,
    };
    expect(() => makeTimeSlot(timeslot)).not.toThrow();
  });
});
