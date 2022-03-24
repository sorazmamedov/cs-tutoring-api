import Joi from "joi";
import { len } from "../validationMessages";

export default Joi.object().keys({
  id: Joi.string().trim().length(len.idLength).required(),

  eventId: Joi.string().trim().length(len.idLength).required(),

  tutorId: Joi.string().trim().length(len.idLength).required(),

  semesterId: Joi.string().trim().length(len.idLength).required(),

  start: Joi.date().required(),

  end: Joi.date().greater(Joi.ref("start")).required(),

  booked: Joi.boolean().required(),

  appointmentId: Joi.string().trim().length(len.idLength).when("booked", {
    is: true,
    then: Joi.required(),
  }),
});
