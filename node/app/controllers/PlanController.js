const Responses = require("sabio-web-models").Responses;
const BaseController = require("./BaseController");
const { RoutePrefix, Route } = require("sabio-routing");
const planService = require("sabio-services").planService;
const Plan = require("sabio-models").Schemas;
const addPlanSchema = Plan.addSchema;
const updatePlanSchema = Plan.updateSchema;

@RoutePrefix("/api/plans")
class PlanController extends BaseController {
  constructor() {
    super("PlanController");
  }
  @Route("DELETE", ":id(\\d+)")
  delete(req, res, next) {
    const targetId = req.params.id;
    planService
      .delete(targetId)
      .then(() => {
        const sResponse = new Responses.SuccessResponse();
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }
  @Route("GET", "paginate")
  getAll(req, res, next) {
    const index = req.query.pageIndex;
    const size = req.query.pageSize;
    planService
      .getAll(index, size)
      .then((plans) => {
        let baseResponse = null;
        let code = 200;
        if (plans) {
          baseResponse = new Responses.ItemResponse(plans);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("Records not found");
        }
        res.status(code).json(baseResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @Route("GET", "search")
  search(req, res, next) {
    const index = req.query.pageIndex;
    const size = req.query.pageSize;
    const query = req.query.q;
    planService
      .searchPlans(index, size, query)
      .then((plans) => {
        let baseResponse = null;
        let code = 200;
        if (plans) {
          baseResponse = new Responses.ItemResponse(plans);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("Records not found");
        }
        res.status(code).json(baseResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }
  @Route("GET", ":id(\\d+)")
  getById(req, res, next) {
    const targetId = req.params.id;
    planService
      .getById(targetId)
      .then((singlePlan) => {
        let baseResponse = null;
        let code = 200;
        if (singlePlan) {
          baseResponse = new Responses.ItemResponse(singlePlan);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("Records not found");
        }
        res.status(code).json(baseResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }
  @Route("GET", "createdby")
  getByCreatedBy(req, res, next) {
    const index = req.query.pageIndex;
    const size = req.query.pageSize;
    planService
      .getByCreatedBy(req.user.id, index, size)
      .then((singlePlan) => {
        let baseResponse = null;
        let code = 200;
        if (singlePlan) {
          baseResponse = new Responses.ItemResponse(singlePlan);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("Records not found");
        }
        res.status(code).json(baseResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }
  @Route("POST", "", addPlanSchema)
  insert(req, res, next) {
    planService
      .add(req.body, req.user.id)
      .then((response) => {
        const sResponse = new Responses.ItemResponse(response);
        res.status("201").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }
  @Route("PUT", "", updatePlanSchema)
  update(req, res, next) {
    planService
      .update(req.body, req.user.id)
      .then((updateResponse) => {
        const sResponse = new Responses.SuccessResponse(updateResponse);
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }
}
module.exports = { controller: PlanController };
