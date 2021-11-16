import makeAdmin from "./";
import { len, errMessages as EM } from "../../validator/validationMessages";

describe("admin/student/tutor", () => {
  it("Cannot be empty", () => {
    const evl = `"about" ${EM.noEmpty}`;
    const admin = {
      id: "ssssssdddddd",
      neiuId: 453535,
      firstName: "Serdar",
      lastName: "razmam",
      email: "asd@neiu.edu",
      about: "",
    };
    expect(() => makeAdmin(admin)).toThrow(evl);
    // expect(() => makeTutor(admin)).not.toThrow();
  });
});
