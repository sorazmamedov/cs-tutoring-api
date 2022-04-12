export default function (...allowedRoles) {
  return (req, res, next) => {
    if (!req?.user?.roles) {
      console.log("Sending 401");
      return res.sendStatus(401);
    }
    const userRoles = req.user.roles;
    const allowed = [...allowedRoles];

    const authorized = allowed.some((role) => userRoles.includes(role));
    if (!authorized) {
      res.sendStatus(403);
      return;
    }

    next();
  };
}
