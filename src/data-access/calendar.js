export default function makeCalendarDb({ makeDb }) {
  return Object.freeze({
    findById,
    insert,
    update,
    remove,
    removeAll,
    removeRange,
    findBetweenDates,
  });

  async function findById({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("calendar").find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function insert({ id: _id, ...calendarInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("calendar")
      .insertOne({ _id, ...calendarInfo });
    return result?.insertedId === _id ? { id: _id, ...calendarInfo } : null;
  }

  async function update({ id: _id, ...calendarInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("calendar")
      .updateOne({ _id }, { $set: { ...calendarInfo } });
    return result.modifiedCount > 0 ? { id: _id, ...calendarInfo } : null;
  }

  async function remove({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("calendar").deleteOne({ _id });
    return result.deletedCount;
  }

  async function removeAll(query) {
    const db = await makeDb();
    const result = await db.collection("calendar").deleteMany(query);
    return result.deletedCount;
  }

  async function removeRange({ eventId, start, end }) {
    const db = await makeDb();
    const baseQuery = { eventId, start: { $gte: start } };
    const query = end ? { ...baseQuery, end: { $lte: end } } : baseQuery;
    const result = await db.collection("calendar").deleteMany(query);
    return result.deletedCount;
  }

  async function findBetweenDates({ semesterId, start, end, tutorId }) {
    const db = await makeDb();
    let result;
    if (tutorId) {
      result = await db.collection("calendar").find({
        semesterId,
        tutorId,
        start: { $gte: start },
        end: { $lte: end },
      });
    } else {
      result = await db.collection("calendar").find({
        semesterId,
        start: { $gte: start },
        end: { $lte: end },
      });
    }
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }
}
