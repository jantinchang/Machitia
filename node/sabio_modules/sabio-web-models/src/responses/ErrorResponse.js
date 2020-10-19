const BaseResponse = require("./BaseResponse");

class ErrorResponse extends BaseResponse {
  constructor(err) {
    super();
    this.isSuccessful = false;

    if (typeof err === "string") {
      this.errors = [err];
    } else if (err instanceof Error) {
      // Output expected TypeErrors.
      this.errors = [
        `${err.message}:${err.stack}
      `
      ];
    } else {
      this.errors = err;
    }
  }
}

module.exports = ErrorResponse;
