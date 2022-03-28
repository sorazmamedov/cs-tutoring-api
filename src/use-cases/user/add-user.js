import makeUser from "../../models/user";
export default function makeAddUser({ db }) {
  return async function addUser(userInfo) {
    const user = makeUser(userInfo);
    const exists = await db.findById({ id: user.getId() }, db.collections.user);
    if (exists) {
      return exists;
    }

    return db.insert(
      {
        id: user.getId(),
        neiuId: user.getNeiuId(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        email: user.getEmail(),
        about: user.getAbout(),
        active: user.isActive(),
        roles: user.getRoles(),
        picture: user.getPicture(),
      },
      db.collections.user
    );
  };
}
