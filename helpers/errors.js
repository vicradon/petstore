class UnsuppliedParameterError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnsuppliedParameterError";
  }
}

class UnauthorizedError extends Error {
  constructor(message = "No JWT supplied or JWT is invalid") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

module.exports = {
  UnsuppliedParameterError,
  UnauthorizedError,
};
