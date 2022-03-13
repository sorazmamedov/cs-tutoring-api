export default function makeDatabase({ makeDb }) {
  return Object.freeze({
    find,
    findAll,
    findByHash,
    findById,
    insert,
    insertMany,
    remove,
    update,
    collections: {
      admin: "admin",
      tutor: "tutor",
      student: "student",
      announcement: "announcement",
      appointment: "appointment",
      course: "course",
      report: "report",
      schedule: "schedule",
      semester: "semester",
      timeslot: "timeslot",
    },
  });

  async function find(query, collection) {
    const db = await makeDb();
    const result = await db.collection(collection).findOne({ ...query });
    let found = null;
    if (result) {
      const { _id: id, ...rest } = result;
      found = { id, ...rest };
    }
    return found;
  }
  async function findAll(collection, params) {
    const db = await makeDb();
    const query = params ? params : {};
    const result = await db.collection(collection).find(query);
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function findById({ id: _id }, collection) {
    const db = await makeDb();
    const result = await db.collection(collection).find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function insert({ id: _id, ...commentInfo }, collection) {
    const db = await makeDb();
    const result = await db
      .collection(collection)
      .insertOne({ _id, ...commentInfo });
    const { _id: id, ...insertedInfo } = result;
    return { id, ...insertedInfo };
  }

  async function insertMany(dataArr, collection) {
    const db = await makeDb();
    const data = dataArr.map((item) => {
      const { id: _id, ...info } = item;
      return { _id, ...info };
    });

    const result = await db.collection(collection).insertMany(data);

    return result.insertedCount > 0 ? true : null;
  }

  async function update({ id: _id, ...commentInfo }, collection) {
    const db = await makeDb();
    const result = await db
      .collection(collection)
      .updateOne({ _id }, { $set: { ...commentInfo } });
    return result.modifiedCount > 0 ? { id: _id, ...commentInfo } : null;
  }

  async function remove({ id: _id }, collection) {
    const db = await makeDb();
    const result = await db.collection(collection).deleteOne({ _id });
    return result.deletedCount;
  }

  async function findByHash(comment) {
    const db = await makeDb();
    const result = await db.collection("comments").find({ hash: comment.hash });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...insertedInfo } = found[0];
    return { id, ...insertedInfo };
  }
}
