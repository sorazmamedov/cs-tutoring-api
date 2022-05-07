import jwt from "jsonwebtoken";
import responseTxt from "../config/responseTxt";

export default async function (req, res, next) {
  const cookie = req.cookies?.jwt;

  if (!cookie) {
    return res.sendStatus(401);
  }

  try {
    jwt.verify(cookie, process.env.COOKIE_SECRET, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
        return;
      }

      req.user = decoded.userInfo;
      next();
    });
  } catch (error) {
    if (error?.message === responseTxt.unauthorized) {
      res.sendStatus(401);
    }
  }
}
