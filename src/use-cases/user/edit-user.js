import makeUser from "../../models/user";
export default function makeEditUser({ db }) {
  return async function editUser({ id, ...changes } = {}) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    if (!changes.about) {
      throw new Error('You must supply "about"');
    }

    const existing = await db.findById({ id }, db.collections.user);
    if (!existing) {
      throw new RangeError("User not found.");
    }

    const user = makeUser({ ...existing, ...changes });

    const updated = await db.update(
      {
        id: user.getId(),
        neiuId: user.getNeiuId(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        email: user.getEmail(),
        about: user.getAbout(),
        active: user.isActive(),
        roles: user.getRoles(),
      },
      db.collections.user
    );

    return { ...existing, ...updated };
  };
}
