export default function makeAppointmentDb({ makeDb }) {
  return Object.freeze({
    find,
    findAll,
    findById,
    insert, //
    insertMany,
    update,
    remove, //
    findMatchingCourses,
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

  async function findAll(params, fields) {
    const db = await makeDb();
    const query = params ? params : {};
    const includeFields = {};
    if (fields) {
      fields.map((field) => (includeFields[field] = 1));
    }
    const result = await db
      .collection("appointment")
      .find(query, { projection: includeFields });
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

  async function findMatchingCourses(semesterId, searchTxt, fields) {
    const db = await makeDb();
    const regex = new RegExp(searchTxt, "i");
    const projection = {};
    if (fields) {
      fields.map((field) => (projection[field] = 1));
    }
    const result = await db.collection("appointment").find(
      {
        semesterId,
        instructorName: { $not: /tba/i },
        $or: [
          { section: regex },
          { courseName: regex },
          { instructorName: regex },
          { instructorEmail: regex },
        ],
      },
      { projection }
    );

    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }
}
