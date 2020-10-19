const Responses = require("sabio-web-models").Responses;
const { RoutePrefix, Route } = require("sabio-routing");
const BaseController = require("./BaseController");
const FeedService = require("sabio-services").feedService;
const { logger } = require("./common");
const Temp = require("sabio-models").Schemas;

const _debug = logger.extend("ping");

const FeedSchema = Temp.FeedSchema;

@RoutePrefix("/api/Feed")
class FeedController extends BaseController {
  constructor() {
    super("FeedController");
  }

  @Route("GET", ":id(\\d+)")
  getById(req, res, next) {
    FeedService.getById(req.params.id)
      .then((feed) => {
        _debug("Get Feed By Id");
        const sResponse = new Responses.ItemResponse(feed);
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @Route("GET", "createdBy")
  getByCreatedBy(req, res, next) {
    FeedService.getByCreatedBy(
      req.user.id,
      req.query.pageIndex,
      req.query.pageSize
    )
      .then((feed) => {
        _debug("Get Feed By CreatedBy");
        const sResponse = new Responses.ItemResponse(feed);
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @Route("POST", "", FeedSchema)
  addFeed(req, res, next) {
    FeedService.insert(req.body, req.user.id)
      .then(() => {
        _debug("Add Feed");
        const sResponse = new Responses.SuccessResponse();
        res.status("201").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @Route("PUT", ":id", FeedSchema)
  updateFeed(req, res, next) {
    FeedService.update(req.params.id, req.body)
      .then(() => {
        _debug("Update Feed");
        const sResponse = new Responses.SuccessResponse();
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @Route("DELETE", ":id(\\d+)")
  deleteFeed(req, res, next) {
    FeedService.delete(req.params.id)
      .then(() => {
        _debug("Delete Feed");
        const sResponse = new Responses.ItemResponse();
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @Route("GET", "")
  getFeed(req, res, next) {
    FeedService.getFollowerFeeds(req.user.id)
      .then((feed) => {
        _debug("Get Feed");
        const sResponse = new Responses.ItemResponse(feed);
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }
}

module.exports = { controller: FeedController };
