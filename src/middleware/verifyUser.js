import jwt from "jsonwebtoken";
import client from "../google-client";

export default async function (req, res, next) {
  const authHeader = req.get("Authorization");
  const cookie = req.cookies?.jwt;

  if (!authHeader?.startsWith("Bearer ") || !cookie) {
    return res.sendStatus(401);
  }

  const tokenId = authHeader.split(" ")[1];

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID,
    });

    const { iss, aud, email } = ticket.getPayload();

    if (
      iss !== "https://accounts.google.com" &&
      aud !== process.env.GOOGLE_CLIENT_ID
    ) {
      res.type("json");
      return res.status(400).send({ error: "Bad Request" });
    }

    jwt.verify(cookie, process.env.COOKIE_SECRET, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
        return;
      }
      if (decoded.userInfo.email !== email) {
        res.sendStatus(403);
        return;
      }
      req.user = decoded.userInfo;
      next();
    });
  } catch (error) {
    next(error);
  }
}
