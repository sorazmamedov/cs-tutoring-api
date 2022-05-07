export default function makeHandleLogin({ jwt, db, responseTxt }) {
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
    console.log(tokenId);
    try {
      let isEmail = /[A-Za-z0-9-]+@neiu.edu$/.test(tokenId);
      let user;
      if (!isEmail) {
        return {
          statusCode: 400,
          body: { error: "Bad Request" },
        };
      }

      user = await db.user.findByEmail({ email: tokenId });
      if (!user) {
        return {
          statusCode: 404,
          body: { error: "User not found!" },
        };
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
