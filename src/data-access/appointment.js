export default function makeAppointmentDb({ makeDb }) {
  return Object.freeze({
    find,
    findAll,
    findById,
    insert, //
    insertMany,
    update,
    remove, //
  });

  async function find(query) {
    const db = await makeDb();
    const result = await db.collection("appointment").findOne({ ...query });
    let found = null;
    if (result) {
      const { _id: id, ...rest } = result;
      found = { id, ...rest };
    }
    return found;
  }

  async function findAll({ semesterId, canceled, userId }) {
    const db = await makeDb();
    const tutorId = userId;
    const studentId = userId;
    const result = await db.collection("appointment").find({
      semesterId,
      canceled,
      $or: [{ tutorId }, { $and: [{ studentId, noShow: false }] }],
    });
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function findById({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("appointment").find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function insert({ id: _id, ...insertInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("appointment")
      .insertOne({ _id, ...insertInfo });
    return result?.insertedId === _id ? { id: _id, ...insertInfo } : null;
  }

  async function insertMany(dataArr) {
    const db = await makeDb();
    const data = dataArr.map((item) => {
      const { id: _id, ...info } = item;
      return { _id, ...info };
    });

    const result = await db.collection("appointment").insertMany(data);

    return result.insertedCount > 0 ? true : null;
  }

  async function update({ id: _id, ...updateInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("appointment")
      .updateOne({ _id }, { $set: { ...updateInfo } });
    return result.modifiedCount > 0 ? { id: _id, ...updateInfo } : null;
  }

  async function remove({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("appointment").deleteOne({ _id });
    return result.deletedCount;
  }
}
