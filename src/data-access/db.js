export default function makeDatabase({ makeDb }) {
  return Object.freeze({
    find,
    findAll,
    findByHash,
    findById,
    insert,
    insertMany,
    remove,
    removeAll,
    removeRange,
    update,
    collections: {
      user: "user",
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
      calendar: "calendar",
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
  async function findAll(collection, params, fields) {
    const db = await makeDb();
    const query = params ? params : {};
    const includeFields = {};
    if (fields) {
      fields.map((field) => (includeFields[field] = 1));
    }
    const result = await db
      .collection(collection)
      .find(query, { projection: includeFields });
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
    return result?.insertedId === _id ? { id: _id, ...commentInfo } : null;
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

  async function removeAll(query, collection) {
    const db = await makeDb();
    const result = await db.collection(collection).deleteMany(query);
    return result.deletedCount;
  }

  async function removeRange({ eventId, start, end }, collection) {
    const db = await makeDb();
    const baseQuery = { eventId, start: { $gte: start } };
    const query = end ? { ...baseQuery, end: { $lte: end } } : baseQuery;
    const result = await db.collection(collection).deleteMany(query);
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
