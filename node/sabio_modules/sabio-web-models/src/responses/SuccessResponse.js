const BaseResponse = require("./BaseResponse");

class SuccessResponse extends BaseResponse {
  constructor() {
    super();
    this.isSuccessful = true;
  }
}

module.exports = SuccessResponse;
