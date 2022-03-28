export default function makeHandleLogin({
  jwt,
  addUser,
  editUser,
  client,
  db,
}) {
  return async function handleLogin(httpRequest) {
    const authHeader = httpRequest.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      console.log("Header does not start with bearer");
      return {
        statusCode: 401,
      };
    }

    const tokenId = authHeader.split(" ")[1];

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID,
    });

    const { hd, email, picture, given_name, family_name } = ticket.getPayload();

    if (hd !== "neiu.edu") {
      return {
        statusCode: 401,
      };
    }

    try {
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
        { expiresIn: 10 }
      );

      const cookie = {
        nam: "jwt",
        value: userInfo,
        options: {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 10000,
        },
      };

      return {
        cookie,
        statusCode: 201,
        body: { ...user },
      };
    } catch (error) {
      if (error.name === "RangeError") {
        return {
          statusCode: 404,
          body: {
            error: e.message,
          },
        };
      }

      return {
        statusCode: 400,
        body: { error: error.message },
      };
    }
  };
}
