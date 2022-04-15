import responseTxt from "../../config/responseTxt";

export default function makeHandleLogin({
  jwt,
  addUser,
  editUser,
  client,
  db,
}) {
  return async function handleLogin(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    const authHeader = httpRequest.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return {
        statusCode: 401,
      };
    }

    const tokenId = authHeader.split(" ")[1];

    try {
      let isEmail = /[A-Za-z0-9-]+@neiu.edu$/.test(tokenId);
      let user;
      if (!isEmail) {
        const ticket = await client
          .verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
          })
          .catch(() => {
            throw new Error(responseTxt.unauthorized);
          });

        const { iss, aud, hd, email, picture, given_name, family_name } =
          ticket.getPayload();
        if (
          iss !== "https://accounts.google.com" &&
          aud !== process.env.GOOGLE_CLIENT_ID
        ) {
          return {
            statusCode: 400,
            body: { error: "Bad Request" },
          };
        }

        if (hd !== "neiu.edu") {
          return {
            statusCode: 401,
            body: { error: "Only NEIU email allowed!" },
          };
        }
        user = await db.find({ email }, db.collections.user);
        const pictureUrl = picture.split("=")[0];

        //if user already exists
        if (user) {
          if (
            user.firstName !== given_name ||
            user.lastName !== family_name ||
            user.picture !== pictureUrl
          ) {
            const modified = await editUser({
              id: user.id,
              firstName: given_name,
              lastName: family_name,
              picture: pictureUrl,
            });

            user = { ...modified };
          }
        } else {
          const created = await addUser({
            email,
            firstName: given_name,
            lastName: family_name,
            picture: pictureUrl,
          });

          user = { ...created };
        }
      } else {
        user = await db.find({ email: tokenId }, db.collections.user);
      }

      const userInfo = jwt.sign({ userInfo: user }, process.env.COOKIE_SECRET, {
        expiresIn: "1h",
      });

      const cookie = {
        name: "jwt",
        value: userInfo,
        options: {
          path: "/",
          httpOnly: true,
          sameSite: "None",
          maxAge: 3600000,
          secure: true,
        },
      };

      return {
        headers,
        cookie,
        statusCode: 201,
        body: { ...user },
      };
    } catch (error) {
      if (error.name === "RangeError") {
        return {
          headers,
          statusCode: 404,
          body: {
            error: error.message,
          },
        };
      }

      if (error?.message === responseTxt.accessDenied) {
        return {
          headers,
          statusCode: 403,
          body: {
            error: error.message,
          },
        };
      }

      if (error?.message === responseTxt.unauthorized) {
        return {
          headers,
          statusCode: 401,
        };
      }

      return {
        headers,
        statusCode: 400,
        body: { error: error.message },
      };
    }
  };
}
