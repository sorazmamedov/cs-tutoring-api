export default async function handleSendEmail({ db, id }) {
  try {
    const appointment = await db.appointment.findById({ id });

    if (appointment) {
      await db.appointment.remove({ id: appointment.id });
    }
  } catch (error) {
    console.log(error);
  }
}
