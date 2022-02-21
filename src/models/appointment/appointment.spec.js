import makeAppointment from "./";
import Id from "../../Id";

describe("appointment", () => {
  it("create appointment", () => {
    const appointment = {
      appointmentId: Id.makeId(),
      tutorId: Id.makeId(),
      studentId: Id.makeId(),
      courseId: "CS324-1",
      appointmentDate: Date.now(),
      location: "loc",
      canceled: true,
      noShow: false,
    };
    expect(() => makeAppointment(appointment)).not.toThrow();
  });
});
