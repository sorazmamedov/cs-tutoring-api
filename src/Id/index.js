import { nanoid } from "nanoid";

const Id = Object.freeze({
  makeId: () => nanoid(12),
});

export default Id;
