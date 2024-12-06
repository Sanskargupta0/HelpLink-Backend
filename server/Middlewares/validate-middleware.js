const schemaMiddleware = (schema) => async (req, res, next) => {
  try {
    const data = req.body;
    const parsedData = await schema.parseAsync(data);
    req.body = parsedData;
    next();
  } catch (error) {
    const err = {
      status: 422,
      msg: "VALIDATION ERROR",
      extraD: error.errors[0].message,
    };
    next(err);
  }
};

module.exports = schemaMiddleware;
