export default function makeListAdmins({ db }) {
  return async function listAdmins() {
    return await db.findAll(db.collections.admin);
  };
}