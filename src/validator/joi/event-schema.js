import Joi from "joi";
import { len } from "../validationMessages";

export default Joi.object().keys({
  id: Joi.string().trim().length(len.idLength).required(),

  tutorId: Joi.string().trim().length(len.idLength).required(),

  semesterId: Joi.string().trim().length(len.idLength).required(),

  start: Joi.date()
    .prefs({ convert: true })
    .min(Joi.ref("$min"))
    .less(Joi.ref("$max"))
    .required(),

  end: Joi.date()
    .prefs({ convert: true })
    .greater(Joi.ref("start"))
    .max(Joi.ref("$max"))
    .required(),

  slots: Joi.array()
    .items(
      Joi.object().keys({
        start: Joi.date()
          .prefs({ convert: true })
          .min(Joi.ref("/start"))
          .max(Joi.ref("/end"))
          .required(),
        end: Joi.date()
          .prefs({ convert: true })
          .greater(Joi.ref("start"))
          .max(Joi.ref("/end"))
          .required(),
      })
    )
    .min(1),

  repeat: Joi.boolean().required(),

  repeatUntil: Joi.date()
    .prefs({ convert: true })
    .greater(Joi.ref("start"))
    .max(Joi.ref("$max"))
    .when("repeat", {
      is: true,
      then: Joi.required(),
    }),
});
