const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ status: false, message: "You are not authenticated" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ status: false, message: "Token is not valid" });
    }

    req.user = user;
    next();
  });
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    const allowedUserTypes = ["Client", "Vendor", "Admin", "Driver"];
    if (allowedUserTypes.includes(req.user.userType)) {
      next();
    } else {
      return res.status(403).json({
        status: false,
        message: "You are not allowed to perform this action",
      });
    }
  });
};

const verifyVendor = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Vendor" || req.user.userType === "Admin") {
      next();
    } else {
      return res.status(403).json({
        status: false,
        message: "You are not allowed to perform this action",
      });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin") {
      next();
    } else {
      return res.status(403).json({
        status: false,
        message: "You are not allowed to perform this action",
      });
    }
  });
};

module.exports = { verifyTokenAndAuthorization, verifyVendor, verifyAdmin };
