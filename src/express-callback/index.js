export default function makeExpressCallback(controller) {
  return (req, res) => {
    console.log("Cookie: ", req.cookies);
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Authorization: req.get("Authorization"),
        // Referer: req.get("referer"),
        // "User-Agent": req.get("User-Agent"),
      },
    };

    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }

        if (httpResponse.cookie) {
          const cookie = httpResponse.cookie;
          res.cookie(cookie.name, cookie.value, cookie.options);
        }
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((e) => {
        console.error(e.stack);
        res.status(500).send({ error: "An unkown error occurred." });
      });
  };
}
