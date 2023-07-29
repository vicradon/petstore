const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "UnauthorizedError": {
      return res.status(403).send(err.message);
    }
    case "TokenExpiredError": {
      return res.status(403).send(err.message);
    }
    default: {
      return res.status(500).send(err.message);
    }
  }
};

module.exports = {
  errorHandler,
};
