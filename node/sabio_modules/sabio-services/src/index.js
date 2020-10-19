const userService = require("./UserService");
const faqService = require("./FAQServices");
const planService = require("./PlanService");
const messageService = require("./MessageService");
const fileUploadService = require("./FileUploadService");
const feedService = require("./FeedService");


const Services = {
  userService,
  faqService,
  planService,
  messageService,
  fileUploadService,
  feedService
};

module.exports = Services;
