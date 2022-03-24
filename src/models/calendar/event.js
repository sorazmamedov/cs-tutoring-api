export default function buildMakeEvent({ Id, eventValidator }) {
  return function makeEvent(
    {
      id = Id.makeId(),
      tutorId,
      semesterId,
      start,
      end,
      slots,
      repeat,
      repeatUntil,
    } = {},
    context
  ) {
    let { error } = eventValidator(
      {
        id,
        tutorId,
        semesterId,
        start,
        end,
        slots,
        repeat,
        repeatUntil,
      },
      context
    );
    if (error) throw new Error(error);

    return Object.freeze({
      getEventId: () => id,
      getTutorId: () => tutorId,
      getSemesterId: () => semesterId,
      getStart: () => start,
      getEnd: () => end,
      getSlots: () => slots,
      doesRepeat: () => repeat,
      getRepeatUntil: () => repeatUntil,
    });
  };
}
