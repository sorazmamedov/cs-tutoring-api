export default function makeRemoveUser({ db }) {
  return async function removeUser({ id } = {}) {
    if (!id) {
      throw new Error("You must supply a valid id.");
    }

    const userToDelete = await db.findById({ id }, db.collections.user);
    if (!userToDelete) {
      throw new RangeError("User not found.");
    }

    return {
      deletedCount: await db.remove(userToDelete, db.collections.user),
      message: "User deleted.",
    };
  };
}
