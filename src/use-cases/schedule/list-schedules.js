export default function makeListSchedules({ db }) {
  return async function listSchedules({ semesterId: id }) {
    const semesterExists = await db.findById({ id }, db.collections.semester);
    if (!semesterExists) {
      throw new Error("You must supply valid semester id!");
    }

    const result = await db.findAll(db.collections.schedule, {
      semesterId: id,
    });

    return result;
    // if (result && result.length !== 0) {
    //   const schedules = await Promise.all(
    //     result.map(async (item) => {
    //       const id = item.tutorId;
    //       const tutor = await db.findById({ id }, db.collections.tutor);
    //       const schedule = {
    //         ...item,
    //         tutor: {
    //           id: tutor.id,
    //           firstName: tutor.firstName,
    //           lastName: tutor.lastName,
    //         },
    //       };
    //       return schedule;
    //     })
    //   );
    //   return schedules;
    // }

    // return [];
  };
}
