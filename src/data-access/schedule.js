export default function makeScheduleDb({ makeDb }) {
  return Object.freeze({
    find,
    findAll,
    findById,
    insert,
    update,
  });

  async function find(query) {
    const db = await makeDb();
    const result = await db.collection("schedule").findOne({ ...query });
    let found = null;
    if (result) {
      const { _id: id, ...rest } = result;
      found = { id, ...rest };
    }
    return found;
  }

  async function findAll(params, fields) {
    const db = await makeDb();
    const query = params ? params : {};
    const includeFields = {};
    if (fields) {
      fields.map((field) => (includeFields[field] = 1));
    }
    const result = await db
      .collection("schedule")
      .find(query, { projection: includeFields });
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function findById({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("schedule").find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function insert({ id: _id, ...scheduleInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("schedule")
      .insertOne({ _id, ...scheduleInfo });
    return result?.insertedId === _id ? { id: _id, ...scheduleInfo } : null;
  }

  async function update({ id: _id, ...scheduleInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("schedule")
      .updateOne({ _id }, { $set: { ...scheduleInfo } });
    return result.modifiedCount > 0 ? { id: _id, ...scheduleInfo } : null;
  }
}
