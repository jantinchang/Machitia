const Responses = require("sabio-web-models").Responses;
const BaseController = require("./BaseController");
const { RoutePrefix, Route } = require("sabio-routing");
const { logger } = require("./common");
const { Temp } = require("sabio-models").Schemas;

const UpdateSchema = Temp.UpdateSchema;

const _debug = logger.extend("entities");

@RoutePrefix("/api/entities")
class EntitiesController extends BaseController {
  constructor() {
    super("EntitiesController");
  }
  addItem(req, res, next) {
    const sResponse = new Responses.ItemResponse(99);

    res.status("201").json(sResponse);
  }

  @Route("POST", ":id", UpdateSchema)
  update(req, res, next) {
    const sResponse = new Responses.ItemResponse(req.body);

    res.status("200").json(sResponse);
  }

  entity(req, res, next) {
    const sResponse = new Responses.ItemsResponse(["entities"]);
    _debug("GET entity.......");
    res.status("200").json(sResponse);
  }

  cars(req, res, next) {
    const sResponse = new Responses.ItemResponse("cars");

    res.status("200").json(sResponse);
  }

  search(req, res, next) {
    const sResponse = new Responses.ItemResponse("win");

    res.status("200").json(sResponse);
  }
}

module.exports = { controller: EntitiesController };
