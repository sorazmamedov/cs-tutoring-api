import makeAdmin from "../../models/admin";
export default function makeEditAdmin({ db }) {
  return async function editAdmin({ id, ...changes } = {}) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    const existing = await db.findById({ id }, db.collections.admin);
    if (!existing) {
      throw new RangeError("Admin not found.");
    }

    const admin = makeAdmin({ ...existing, ...changes });

    const updated = await db.update(
      {
        id: admin.getId(),
        neiuId: admin.getNeiuId(),
        firstName: admin.getFirstName(),
        lastName: admin.getLastName(),
        email: admin.getEmail(),
        about: admin.getAbout(),
      },
      db.collections.admin
    );

    return { ...existing, ...updated };
  };
}
