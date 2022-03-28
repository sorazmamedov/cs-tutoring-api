export default function makeListUsers({ db }) {
  return async function listUsers() {
    return await db.findAll(db.collections.user);
  };
}
