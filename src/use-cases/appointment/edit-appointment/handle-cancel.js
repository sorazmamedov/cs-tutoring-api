export default async function handleCancel({
  db,
  appointment,
  timeslot,
  canceled,
  dateFns,
  responseTxt,
}) {
  if (canceled === appointment.canceled) {
    throw new Error("Nothing to change");
  }

  const hasPassed = dateFns.isPast(appointment.end);
  if (!canceled || hasPassed || appointment.noShow || appointment.canceled) {
    throw new Error(responseTxt.accessDenied);
  }

  const slotPromise = db.timeslot.update({
    ...timeslot,
    booked: false,
    appointmentId: null,
  });

  const appointmentPromise = db.appointment.update({
    ...appointment,
    canceled: true,
  });

  await Promise.all([slotPromise, appointmentPromise]);

  return { message: "Appointment has been canceled" };
}
