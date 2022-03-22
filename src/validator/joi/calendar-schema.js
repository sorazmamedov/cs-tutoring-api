import Joi from "joi";
import vs from "./validationSchemas";

export default Joi.object().keys({
  id: vs.nanoid,
  tutorId: vs.nanoid,
  semesterId: vs.nanoid,
  start: vs.start,
  end: vs.end,
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

  repeat: vs.boolean,

  range: Joi.object()
    .keys({
      start: Joi.date()
        .prefs({ convert: true })
        .min(Joi.ref("/start"))
        .less(Joi.ref("$max")),
      end: Joi.date()
        .prefs({ convert: true })
        .greater(Joi.ref("start"))
        .max(Joi.ref("$max")),
    })
    .when("repeat", {
      is: true,
      then: Joi.required(),
    }),
});
