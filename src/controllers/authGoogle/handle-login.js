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
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.CLIENT_ID,
      });

      const { hd, email, picture, given_name, family_name } =
        ticket.getPayload();

      if (hd !== "neiu.edu") {
        return {
          statusCode: 401,
          body: { error: "Only NEIU email allowed!" },
        };
      }

      let user = await db.find({ email }, db.collections.user);
      const pictureUrl = picture.split("=")[0];

      //if user already exists
      if (user) {
        if (
          user.firstName !== given_name ||
          user.lastName !== family_name ||
          user.picture !== pictureUrl
        ) {
          const modified = await editUser({
            ...user,
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
          roles: [2017],
        });

        user = { ...created };
      }

      const userInfo = jwt.sign(
        { userInfo: user },
        process.env.COOKIE_TOKEN_SECRET,
        { expiresIn: 1000 }
      );

      const cookie = {
        name: "jwt",
        value: userInfo,
        options: {
          path: "/",
          httpOnly: true,
          sameSite: "None",
          maxAge: 10000000,
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

      return {
        headers,
        statusCode: 400,
        body: { error: error.message },
      };
    }
  };
}
