import jwt from "jsonwebtoken";
import client from "../google-client";
import responseTxt from "../config/responseTxt";

export default async function (req, res, next) {
  const headers = {
    "Content-Type": "application/json",
  };
  const authHeader = req.get("Authorization");
  const cookie = req.cookies?.jwt;

  if (!authHeader?.startsWith("Bearer ") || !cookie) {
    return res.sendStatus(401);
  }

  const tokenId = authHeader.split(" ")[1];

  try {
    let isEmail = /[A-Za-z0-9-]+@neiu.edu$/.test(tokenId);
    if (!isEmail) {
      const ticket = await client
        .verifyIdToken({
          idToken: tokenId,
          audience: process.env.CLIENT_ID,
        })
        .catch(() => {
          throw new Error(responseTxt.unauthorized);
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
          res.sendStatus(401);
          return;
        }
        if (decoded.userInfo.email !== email) {
          res.sendStatus(403);
          return;
        }
        req.user = decoded.userInfo;
        next();
      });
    } else {
      jwt.verify(cookie, process.env.COOKIE_SECRET, (err, decoded) => {
        if (err) {
          res.sendStatus(401);
          return;
        }
        if (decoded.userInfo.email !== tokenId) {
          res.sendStatus(403);
          return;
        }
        req.user = decoded.userInfo;
        next();
      });
    }
  } catch (error) {
    if (error?.message === responseTxt.unauthorized) {
      res.sendStatus(401);
    }
    // next(error);
  }
}
