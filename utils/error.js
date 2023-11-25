module.exports = {
  badRequest: () => {
    return res.status(400).json({
      status: "error",
      message: "Bad Request",
    });
  },
  internalServer: () => {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  },
};
