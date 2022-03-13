import makeAdmin from "../../models/admin";
export default function makeAddAdmin({ db }) {
  return async function addAdmin(adminInfo) {
    const admin = makeAdmin(adminInfo);
    const exists = await db.findById(
      { id: admin.getId() },
      db.collections.admin
    );
    if (exists) {
      return exists;
    }

    return db.insert(
      {
        id: admin.getId(),
        neiuId: admin.getNeiuId(),
        firstName: admin.getFirstName(),
        lastName: admin.getLastName(),
        email: admin.getEmail(),
        about: admin.getAbout(),
        isActive: admin.getIsActive(),
      },
      db.collections.admin
    );
  };
}
