module.exports = {
  badRequest: (res) => {
    return res.status(400).json({
      status: "error",
      message: "Bad Request",
    });
  },
  internalServer: (res) => {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  },
};
