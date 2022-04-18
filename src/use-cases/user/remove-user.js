import responseTxt from "../../config/responseTxt";

export default function makeRemoveUser({ db }) {
  return async function removeUser({ id } = {}) {
    if (!id) {
      throw new Error(responseTxt.invalidId);
    }

    const userToDelete = await db.user.findById({ id });
    if (!userToDelete) {
      throw new RangeError(`User ${responseTxt.notFound}`);
    }

    return {
      deletedCount: await db.user.remove(userToDelete),
      message: "User deleted.",
    };
  };
}
