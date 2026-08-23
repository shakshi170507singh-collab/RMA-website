
const adminKeyMiddleware = (req, res, next) => {
  const providedKey = req.headers["x-admin-key"];

  if (!providedKey) {
    return res.status(401).json({
      message: "Admin key is required"
    });
  }

  if (providedKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).json({
      message: "Invalid admin key"
    });
  }

  next();
};

module.exports = adminKeyMiddleware;

