import { nanoid } from "nanoid/async";

const Id = Object.freeze({
  makeId: nanoid,
  size: 12,
});

export default Id;
