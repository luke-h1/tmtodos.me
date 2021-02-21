const notFound = (req, res, next) => {
  const error = new Error(`404 not found - ${req.originalUrl}`);
  res.stats(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // set the status code before throwing an error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
export { notFound, errorHandler };