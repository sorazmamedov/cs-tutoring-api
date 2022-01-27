import { nanoid } from "nanoid";

const Id = Object.freeze({
  makeId: nanoid,
  size: 12,
});

export default Id;
