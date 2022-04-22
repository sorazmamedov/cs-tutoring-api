import {
  differenceInMinutes,
  eachDayOfInterval,
  parseISO,
  isAfter,
  set,
  addWeeks,
  isPast,
  format,
  addMinutes,
} from "date-fns";

export default Object.freeze({
  eachDayOfInterval: (from, to, step = 7) => {
    const start = typeof from === "string" ? parseISO(from) : from;
    const end = typeof to === "string" ? parseISO(to) : to;

    return eachDayOfInterval({ start, end }, { step });
  },

  parseISO: (date) => {
    return parseISO(date);
  },

  differenceInMinutes: (left, right) => {
    const dateLeft = typeof left === "string" ? parseISO(left) : left;
    const dateRight = typeof right === "string" ? parseISO(right) : right;

    return differenceInMinutes(dateLeft, dateRight);
  },

  set: (base, { hours, minutes }) => {
    const date = typeof base === "string" ? parseISO(base) : base;
    return set(date, { hours, minutes });
  },

  isAfter: (date, dateToCompare) => {
    return isAfter(date, dateToCompare);
  },

  addWeeks: (base, numberOfWeeks = 1) => {
    const date = typeof base === "string" ? parseISO(base) : base;

    return addWeeks(date, numberOfWeeks);
  },

  isPast: (base) => {
    const date = typeof base === "string" ? parseISO(base) : base;

    return isPast(base);
  },

  format: (base, token) => {
    const date = typeof base === "string" ? parseISO(base) : base;

    return format(date, token);
  },

  addMinutes: (base, minutes) => {
    const date = typeof base === "string" ? parseISO(base) : base;

    return addMinutes(date, minutes);
  },
});
