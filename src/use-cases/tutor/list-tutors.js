export default function makeListTutors({ db }) {
  return async function listTutors() {
    return await db.findAll(db.collections.tutor);
  };
}
