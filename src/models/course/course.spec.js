import makeCourse from "./";
import Id from "../../Id";

describe("course", () => {
  it("create course", () => {
    const course = {
      id: Id.makeId(),
      courseCode: "CS324-1",
      courseName: "Algorithms",
      semesterId: "Spring2022",
      instructorName: "Elizabeth Stone",
      instructorEmail: "estone@neiu.edu",
    };
    expect(() => makeCourse(course)).not.toThrow();
  });

  it("Invalid semesterId", () => {
    const course = {
      id: Id.makeId(),
      courseCode: "CS324-1",
      courseName: "Algorithms",
      semesterId: "Summer2019",
      instructorName: "Elizabeth Stone",
      instructorEmail: "estone@neiu.edu",
    };
    expect(() => makeCourse(course)).not.toThrow();
  });

  it("Invalid email domain", () => {
    const course = {
      id: Id.makeId(),
      courseCode: "CS324-1",
      courseName: "Algorithms",
      semesterId: Id.makeId(),
      instructorName: "Elizabeth Stone",
      instructorEmail: "estone@neiu.com",
    };
    expect(() => makeCourse(course)).toThrow();
  });
});
