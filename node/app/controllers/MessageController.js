const Responses = require("sabio-web-models").Responses;
const BaseController = require("./BaseController");
const messageService = require("sabio-services").messageService;
const { RoutePrefix, Route } = require("sabio-routing");
const Messages = require("sabio-models").Schemas;
const addMessageSchema = Messages.addSchema;
const updateMessageSchema = Messages.updateSchema;

@RoutePrefix("/api/messages")
class MessageController extends BaseController {
  constructor() {
    super("MessageController");
  }
  @Route("POST", "", addMessageSchema)
  add(req, res, next) {
    messageService.add(req.body, req.user.id)
      .then((messageId) => {
        const sResponse = new Responses.ItemResponse(messageId);
        res.status("201").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }
  @Route("PUT", ":id(\\d+)", updateMessageSchema)
  update(req, res, next) {
    messageService.update(req.body, req.params.id, req.user.id)
      .then(() => {
        const sResponse = new Responses.SuccessResponse();
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }
  @Route("DELETE", ":id(\\d+)")
  delete(req, res, next) {
    messageService.deleteById(req.params.id)
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
    messageService
      .getAll(req.query.pageSize, req.query.pageIndex)
      .then(messagePage => {
        let baseResponse = null;
        let code = 200;
        if (messagePage) {
          baseResponse = new Responses.ItemResponse(messagePage);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("Records not found");
        }
        res.status(code).json(baseResponse);
      })
      .catch(err => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }
  @Route("GET", ":id(\\d+)")
  getById(req, res, next) {
    messageService
      .getById(req.params.id)
      .then(message => {
        let baseResponse = null;
        let code = 200;
        if (message) {
          baseResponse = new Responses.ItemResponse(message);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("Records not found");
        }
        res.status(code).json(baseResponse);
      })
      .catch(err => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }
  @Route("GET", "createdby")
  getByCreatedBy(req, res, next) {
    messageService
      .getByCreatedBy(req.query.pageIndex, req.query.pageSize, req.user.id)
      .then(messagePage => {
        let baseResponse = null;
        let code = 200;
        if (messagePage) {
          baseResponse = new Responses.ItemResponse(messagePage);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("Records not found");
        }
        res.status(code).json(baseResponse);
      })
      .catch(err => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }
  @Route("GET", "conversation/:correspondentId(\\d+)")
  getByConversation(req, res, next) {
    messageService
      .getByConversation(req.params.correspondentId, req.user.id)
      .then(messageList => {
        let baseResponse = null;
        let code = 200;
        if (messageList) {
          baseResponse = new Responses.ItemsResponse(messageList);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("Records not found");
        }
        res.status(code).json(baseResponse);
      })
      .catch(err => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }
  @Route("GET", "correspondents")
  getCorrespondents(req, res, next) {
    messageService
      .getCorrespondents(req.user.id)
      .then(correspondentList => {
        let baseResponse = null;
        let code = 200;
        if (correspondentList) {
          baseResponse = new Responses.ItemsResponse(correspondentList);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("Records not found");
        }
        res.status(code).json(baseResponse);
      })
      .catch(err => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }
  @Route("GET", "searchcorrespondents")
  searchCorrespondents(req, res, next) {
    messageService
      .searchCorrespondents(req.user.id, req.query.query)
      .then(correspondentList => {
        let baseResponse = null;
        let code = 200;
        if (correspondentList) {
          baseResponse = new Responses.ItemsResponse(correspondentList);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("Records not found");
        }
        res.status(code).json(baseResponse);
      })
      .catch(err => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }
  @Route("GET", "recipient/:recipientId(\\d+)")
  getByRecipientId(req, res, next) {
    messageService
      .getByRecipientId(req.query.pageIndex, req.query.pageSize, req.params.recipientId)
      .then(messagePage => {
        let baseResponse = null;
        let code = 200;
        if (messagePage) {
          baseResponse = new Responses.ItemResponse(messagePage);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("Records not found");
        }
        res.status(code).json(baseResponse);
      })
      .catch(err => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }
}
module.exports = { controller: MessageController };