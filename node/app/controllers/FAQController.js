const Responses = require("sabio-web-models").Responses;
const { AllowAnonymous, RoutePrefix, Route } = require("sabio-routing");
const BaseController = require("./BaseController");
const FAQService = require("sabio-services").faqService;
const { logger } = require("./common");
const Temp = require("sabio-models").Schemas;

const _debug = logger.extend("ping");

const FAQSchema = Temp.FAQSchema;

@RoutePrefix("/api/FAQ")
class FAQController extends BaseController {
  constructor() {
    super("FAQController");
  }

  @AllowAnonymous()
  @Route("GET", "")
  getAll(req, res, next) {
    FAQService.getAll()
      .then((faq) => {
        _debug("Get All FAQs");
        const sResponse = new Responses.ItemsResponse(faq);
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @AllowAnonymous()
  @Route("GET", ":id(\\d+)")
  getById(req, res, next) {
    FAQService.getById(req.params.id)
      .then((faq) => {
        _debug("Get FAQ By Id");
        const sResponse = new Responses.ItemResponse(faq);
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @AllowAnonymous()
  @Route("GET", "createdBy")
  getByCreatedBy(req, res, next) {
    FAQService.getByCreatedBy(
      req.user.id,
      req.query.pageIndex,
      req.query.pageSize
    )
      .then((faq) => {
        _debug("Get FAQs By CreatedBy");
        const sResponse = new Responses.ItemResponse(faq);
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @Route("POST", "", FAQSchema)
  addFAQ(req, res, next) {
    FAQService.add(req.body, req.user.id)
      .then(() => {
        _debug("Add FAQs");
        const sResponse = new Responses.SuccessResponse();
        res.status("201").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @Route("PUT", ":id", FAQSchema)
  updateFAQ(req, res, next) {
    FAQService.update(req.params.id, req.user.id, req.body)
      .then(() => {
        _debug("Update FAQs");
        const sResponse = new Responses.SuccessResponse();
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @Route("DELETE", ":id")
  deleteFAQ(req, res, next) {
    FAQService.delete(req.params.id)
      .then(() => {
        _debug("Delete FAQs");
        const sResponse = new Responses.ItemResponse();
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }
}

module.exports = { controller: FAQController };
