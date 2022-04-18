export default function makeSemesterDb({ makeDb }) {
  return Object.freeze({
    find,
    findAll,
    findById,
    insert,
    update,
  });

  async function find(query) {
    const db = await makeDb();
    const result = await db.collection("semester").findOne({ ...query });
    let found = null;
    if (result) {
      const { _id: id, ...rest } = result;
      found = { id, ...rest };
    }
    return found;
  }

  async function findAll() {
    const db = await makeDb();
    const result = await db.collection("semester").find({});
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function findById({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("semester").find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function insert({ id: _id, ...semesterInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("semester")
      .insertOne({ _id, ...semesterInfo });
    return result?.insertedId === _id ? { id: _id, ...semesterInfo } : null;
  }

  async function update({ id: _id, ...semesterInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("semester")
      .updateOne({ _id }, { $set: { ...semesterInfo } });
    return result.modifiedCount > 0 ? { id: _id, ...semesterInfo } : null;
  }
}
