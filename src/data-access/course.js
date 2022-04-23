export default function makeCourseDb({ makeDb }) {
  return Object.freeze({
    countTotal,
    findAll,
    findById,
    findByIdAndProject,
    insert,
    insertMany,
    update,
    remove,
    findMatchingCourses,
  });

  async function countTotal(query) {
    const db = await makeDb();
    return await db.collection("course").countDocuments(query);
  }

  async function findAll({ semesterId }) {
    const db = await makeDb();
    const result = await db.collection("course").find({ semesterId });
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function findById({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("course").find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function findByIdAndProject({ id: _id, fields }) {
    const db = await makeDb();
    const includeFields = {};
    if (fields) {
      fields.map((field) => (includeFields[field] = 1));
    }
    const result = await db
      .collection("course")
      .find({ _id }, { projection: includeFields });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return info;
  }

  async function insert({ id: _id, ...courseInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("course")
      .insertOne({ _id, ...courseInfo });
    return result?.insertedId === _id ? { id: _id, ...courseInfo } : null;
  }

  async function insertMany(dataArr) {
    const db = await makeDb();
    const data = dataArr.map((item) => {
      const { id: _id, ...info } = item;
      return { _id, ...info };
    });

    const result = await db.collection("course").insertMany(data);

    return result.insertedCount > 0 ? true : null;
  }

  async function update({ id: _id, ...courseInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("course")
      .updateOne({ _id }, { $set: { ...courseInfo } });
    return result.modifiedCount > 0 ? { id: _id, ...courseInfo } : null;
  }

  async function remove({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("course").deleteOne({ _id });
    return result.deletedCount;
  }

  async function findMatchingCourses({ semesterId, searchTxt, fields }) {
    const db = await makeDb();
    const regex = new RegExp(searchTxt, "i");
    const projection = {};
    if (fields) {
      fields.map((field) => (projection[field] = 1));
    }
    const result = await db.collection("course").find(
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
