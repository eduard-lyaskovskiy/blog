const handleError = (errCode, err, res) => {
  return res.status(errCode).json({
    Error: err,
    message: 'An error occurred unexpected by the server!',
    status: 'error'
  });
};

module.exports = handleError;
