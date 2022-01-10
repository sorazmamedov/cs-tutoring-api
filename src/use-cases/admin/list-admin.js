export default function makeListAdmin({ db }) {
  return async function listAdmins() {
    return await db.findAll(db.collections.admin);
  };
}
