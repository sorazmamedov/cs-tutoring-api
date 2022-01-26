import Id from "../Id";

export default function makeDatabase({ makeDb }) {
  return Object.freeze({
    findAll,
    findByHash,
    findById,
    insert,
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

  async function findAll(collection) {
    const db = await makeDb();
    //const query = publishedOnly ? { published: true } : {};
    const result = await db.collection(collection).find({});
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

  async function insert(
    { id: _id = Id.makeId(Id.size), ...commentInfo },
    collection
  ) {
    const db = await makeDb();
    const result = await db
      .collection(collection)
      .insertOne({ _id, ...commentInfo });
    const { _id: id, ...insertedInfo } = result;
    return { id, ...insertedInfo };
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
