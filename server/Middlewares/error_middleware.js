const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.msg || "BACKEND ERROR";
  const extraDetails = err.extraD || "Something went wrong";

  return res.status(status).json({ msg: message, extrD:extraDetails });
};

module.exports = errorMiddleware;
