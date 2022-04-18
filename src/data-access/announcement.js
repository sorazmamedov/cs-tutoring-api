export default function makeAnnouncementDb({ makeDb }) {
  return Object.freeze({
    find,
    findAll,
    findById,
    insert,
    remove,
    removeAll,
    update,
  });

  async function find(query) {
    const db = await makeDb();
    const result = await db.collection("announcement").findOne({ ...query });
    let found = null;
    if (result) {
      const { _id: id, ...rest } = result;
      found = { id, ...rest };
    }
    return found;
  }

  async function findAll(query) {
    const db = await makeDb();
    const result = await db.collection("announcement").find({ ...query });
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function findById({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("announcement").find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function insert({ id: _id, ...announcementInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("announcement")
      .insertOne({ _id, ...announcementInfo });
    return result?.insertedId === _id ? { id: _id, ...announcementInfo } : null;
  }

  async function update({ id: _id, ...announcementInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("announcement")
      .updateOne({ _id }, { $set: { ...announcementInfo } });
    return result.modifiedCount > 0 ? { id: _id, ...announcementInfo } : null;
  }

  async function remove({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("announcement").deleteOne({ _id });
    return result.deletedCount;
  }

  async function removeAll(query) {
    const db = await makeDb();
    const result = await db.collection("announcement").deleteMany(query);
    return result.deletedCount;
  }
}
