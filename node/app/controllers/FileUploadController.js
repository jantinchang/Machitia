const Responses = require("sabio-web-models").Responses;
const { AllowAnonymous, RoutePrefix, Route } = require("sabio-routing");
const BaseController = require("./BaseController");
const FileUploadService = require("sabio-services").fileUploadService;
const { logger } = require("./common");
const fs = require("fs");
const _debug = logger.extend("ping");
var mime = require("mime-types");

var formidable = require("formidable");
var extPath = require("path");

const AWS = require("aws-sdk");
const uuid = require("uuid");

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

@RoutePrefix("/api/FileUpload")
class FileUploadController extends BaseController {
  constructor() {
    super("FileUploadController");
    AWS.config.update({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    });
  }

  @AllowAnonymous()
  @Route("GET", "paginate")
  getAll(req, res, next) {
    FileUploadService.getAll(req.query.pageIndex, req.query.pageSize)
      .then((file) => {
        _debug("Get All Files");
        const sResponse = new Responses.ItemResponse(file);
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @AllowAnonymous()
  @Route("GET", ":id(\\d+)")
  getById(req, res, next) {
    FileUploadService.getById(req.params.id)
      .then((file) => {
        _debug("Get File By Id");
        const sResponse = new Responses.ItemResponse(file);
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @AllowAnonymous()
  @Route("GET", "createdBy")
  getByCreatedBy(req, res, next) {
    FileUploadService.getByCreatedBy(
      req.user.id,
      req.query.pageIndex,
      req.query.pageSize
    )
      .then((file) => {
        _debug("Get File By CreatedBy");
        const sResponse = new Responses.ItemResponse(file);
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @Route("POST", "")
  addFiletoAWS(req, res, next) {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    const promises = [];
    const s3 = new AWS.S3();

    form.on("file", function (field, file) {
      let buffer = null;
      buffer = fs.readFileSync(file.path);
     
      const params = {
        Bucket: "sabio-training",
        Key: `Machitia_/${uuid.v4()}-${file.name}`,
        Body: buffer,
        ContentType: mime.contentType(file.name),
      };
      const uploadedFile = new Promise((resolve, reject) => {
        s3.upload(params, function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(params.Key);
          }
        });
      });
      promises.push(uploadedFile);
    });
    form.on("end", () => {
      Promise.all(promises).then((list) => {
        let urls = [];
        for (let i = 0; i < list.length; i++) {
          _debug(list[i]);
          urls.push(`${process.env.AWS_DOMAIN}/${list[i]}`);
        }
        const sResponse = new Responses.ItemsResponse(urls);
        res.json(sResponse);
      });
    });
    form.parse(req);
  }

  @Route("PUT", ":id")
  updateFile(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      const params = {
        Bucket: "sabio-training",
        Key: `Machitia_${uuid.v4()}` + extPath.extname(files.upload.name),
        Body: files.upload.path,
      };
      s3.upload(params, function (err, data) {
        if (err) throw err;
        _debug(`File uploaded successfully. ${data.Location}`);

        FileUploadService.update(req.params.id, data.Location, 2, 2)
          .then(() => {
            _debug("Update Files");
            const sResponse = new Responses.SuccessResponse();
            res.status("200").json(sResponse);
          })
          .catch((err) => {
            res.status("500").json(new Responses.ErrorResponse(err));
          });
      });
    });
  }

  @Route("DELETE", ":id")
  deleteFile(req, res, next) {
    FileUploadService.delete(req.params.id)
      .then(() => {
        _debug("Delete File");
        const sResponse = new Responses.ItemResponse();
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }
}

module.exports = { controller: FileUploadController };
