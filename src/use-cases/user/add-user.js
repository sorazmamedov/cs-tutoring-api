import makeUser from "../../models/user";
export default function makeAddUser({ db, Roles }) {
  return async function addUser(userInfo) {
    const user = makeUser({ ...userInfo, isActive: false, roles: [Roles.User] });
    const exists = await db.find(
      { email: user.getEmail() },
      db.collections.user
    );

    if (exists) {
      return exists;
    }

    return db.insert(
      {
        id: user.getId(),
        neiuId: user.getNeiuId(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        pronouns: user.getPronouns(),
        email: user.getEmail(),
        about: user.getAbout(),
        isActive: user.getIsActive(),
        roles: user.getRoles(),
        picture: user.getPicture(),
        activeSemesters: user.getActiveSemesters(),
      },
      db.collections.user
    );
  };
}
