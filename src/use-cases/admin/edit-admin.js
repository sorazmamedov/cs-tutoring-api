import makeAdmin from "../../models/admin";
export default function makeEditAdmin({ db }) {
  return async function editAdmin({ id, ...changes } = {}) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    if (!changes.about) {
      throw new Error('You must supply "about"');
    }

    const existing = await db.findById({ id });
    if (!existing) {
      throw new RangeError("Admin not found.");
    }

    const admin = makeAdmin({ ...existing, ...changes });

    const updated = await db.update({
      id: admin.getId(),
      neiuId: admin.getNeiuId(),
      firstName: admin.getFirstName(),
      lastName: admin.getLastName(),
      email: admin.getEmail(),
      about: admin.getAbout(),
    });

    return { ...existing, ...updated };
  };
}
