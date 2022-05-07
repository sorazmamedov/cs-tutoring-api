export default function makeHandleLogout() {
  return async function handleLogout(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    const cookies = httpRequest.cookies;
    if (!cookies?.jwt) return { statusCode: 204 }; //No content

    return {
      headers,
      clearCookie: {
        name: "jwt",
        options: {
          path: "/",
          httpOnly: true,
          sameSite: "None",
          secure: true,
        },
      },
      statusCode: 204,
    };
  };
}
