export default function makeTimeslotDb({ makeDb }) {
  return Object.freeze({
    find,
    findById,
    insert,
    remove,
    removeAll,
    removeRange,
    update,
    findBetweenDates,
  });

  async function find(query) {
    const db = await makeDb();
    const result = await db.collection("timeslot").findOne({ ...query });
    let found = null;
    if (result) {
      const { _id: id, ...rest } = result;
      found = { id, ...rest };
    }
    return found;
  }

  async function findBetweenDates({ eventId, start, end, tutorId }) {
    const db = await makeDb();
    let result;
    if (tutorId) {
      result = await db.collection("timeslot").find({
        tutorId,
        start: { $gte: start },
        end: { $lte: end },
      });
    } else if (eventId) {
      result = await db.collection("timeslot").find({
        eventId,
        start: { $gte: start },
        end: { $lte: end },
      });
    } else {
      result = await db.collection("timeslot").find({
        start: { $gte: start },
        end: { $lte: end },
      });
    }
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function findById({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("timeslot").find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function insert({ id: _id, ...timeslotInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("timeslot")
      .insertOne({ _id, ...timeslotInfo });
    return result?.insertedId === _id ? { id: _id, ...timeslotInfo } : null;
  }

  async function update({ id: _id, ...timeslotInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("timeslot")
      .updateOne({ _id }, { $set: { ...timeslotInfo } });
    return result.modifiedCount > 0 ? { id: _id, ...timeslotInfo } : null;
  }

  async function remove({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("timeslot").deleteOne({ _id });
    return result.deletedCount;
  }

  async function removeAll(query) {
    const db = await makeDb();
    const result = await db.collection("timeslot").deleteMany(query);
    return result.deletedCount;
  }

  async function removeRange({ eventId, start, end }) {
    const db = await makeDb();
    const baseQuery = { eventId, start: { $gte: start } };
    const query = end ? { ...baseQuery, end: { $lte: end } } : baseQuery;
    const result = await db.collection("timeslot").deleteMany(query);
    return result.deletedCount;
  }
}
