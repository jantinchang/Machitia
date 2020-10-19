class BaseResponse {
  constructor() {
    this.isSuccessful = false;
    this.transactionId = new Date().getTime();
  }
}

module.exports = BaseResponse;
