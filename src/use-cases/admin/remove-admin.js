export default function makeRemoveAdmin({ db }) {
  return async function removeAdmin({ id } = {}) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    const adminToDelete = await db.findById({ id });
    if (!adminToDelete) {
      throw new RangeError("Admin not found.");
    }

    return {
      deletedCount: await db.remove(adminToDelete, db.collections.admin),
      message: "admin deleted.",
    };
  };
}
