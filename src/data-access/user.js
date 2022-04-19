export default function makeUserDb({ makeDb }) {
  return Object.freeze({
    find,
    findAll,
    findByIdAndProject,
    findById,
    findByEmail,
    insert,
    remove,
    update,
  });

  async function find(query) {
    const db = await makeDb();
    const result = await db.collection("user").findOne({ ...query });
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
      .collection("user")
      .find(query, { projection: includeFields });
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function findByIdAndProject({ id: _id, fields }) {
    const db = await makeDb();
    const includeFields = {};
    if (fields) {
      fields.map((field) => (includeFields[field] = 1));
    }
    const result = await db
      .collection("user")
      .find({ _id }, { projection: includeFields });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return info;
  }

  async function findById({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("user").find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function findByEmail({ email }) {
    const db = await makeDb();
    const result = await db.collection("user").find({ email });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function insert({ id: _id, ...userInfo }) {
    const db = await makeDb();
    const result = await db.collection("user").insertOne({ _id, ...userInfo });
    return result?.insertedId === _id ? { id: _id, ...userInfo } : null;
  }

  async function update({ id: _id, ...userInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("user")
      .updateOne({ _id }, { $set: { ...userInfo } });
    return result.modifiedCount > 0 ? { id: _id, ...userInfo } : null;
  }

  async function remove({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("user").deleteOne({ _id });
    return result.deletedCount;
  }
}
