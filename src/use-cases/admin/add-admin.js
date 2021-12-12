import makeAdmin from "../../models/admin";
export default function makeAddAdmin({ db }) {
  return async function addAdmin(adminInfo) {
    const admin = makeAdmin(adminInfo);
    const exists = await db.findById({ id: admin.getId() });
    if (exists) {
      return exists;
    }

    return db.insert()

  };
}