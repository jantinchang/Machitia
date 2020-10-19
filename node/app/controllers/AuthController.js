const Responses = require("sabio-web-models").Responses;
const BaseController = require("./BaseController");
const userService = require("sabio-services").userService;
const LogIn = require("sabio-models").Schemas;
const { AllowAnonymous, RoutePrefix, Route } = require("sabio-routing");
const LogInSchema = LogIn.LogInSchema;



@RoutePrefix("/api/auth")
class AuthController extends BaseController {
  constructor() {
    super("AuthController");
  }

  @AllowAnonymous()
  @Route("POST", "login", LogInSchema)
  logInByBody(req, res, next) {
    const userEmail = req.body.email;
    const userPasswordInput = req.body.password;

    userService
      // This will check if the user isConfirmed, and if the userStatusId === 1 in SQL.
      .getStatusByEmail(userEmail)
      .then((response) => {
        // This is null if there is no UserProfile created. I will try to re-route via loginerror from react.
        if (response.userStatusId === 1) {
          userService
            .userLogIn(res, userEmail, userPasswordInput)
            .then((singleUser) => {
              let baseResponse = null;
              let code = 200;

              if (singleUser) {
                baseResponse = new Responses.SuccessResponse();
              } else {
                code = 404;
                baseResponse = new Responses.ErrorResponse("Matches not found");
              }
              res.status(code).json(baseResponse);
            })
            .catch((err) => {
              res.status("500").json(new Responses.ErrorResponse(err));
            });
        } else {
          let baseResponse = new Responses.ErrorResponse(
            "Please Confirm Your Email or Check Your Status!"
          );
          let code = 404;
          res.status(code).json(baseResponse);
        }
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @AllowAnonymous()
  @Route("GET", "logout")
  logout(req, res, next) {
    userService
      .logOut(res)
      .then(() => {
        const sResponse = new Responses.SuccessResponse();
        res.status("200").json(sResponse);
      })
      .catch((e) => {
        res.status("500").json(new Responses.ErrorResponse(e));
      });
  }

  @Route("GET", "current")
  getCurrentUser(req, res, next) {
    const sResponse = new Responses.ItemResponse(req.user);
    res.status("200").json(sResponse);
  }

  @Route("POST", "current")
  getCurrentUserPost(req, res, next) {
    // for post request
    const sResponse = new Responses.ItemResponse(req.user);
    res.status("200").json(sResponse);
  }

  @AllowAnonymous()
  @Route("PUT", ":token")
  activateUser(req, res, next) {
    const token = req.params.token;
    userService
      .updateConfirmation(token)
      .then(() => {
        const sResponse = new Responses.SuccessResponse();
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @AllowAnonymous()
  @Route("POST", "")
  registerUser(req, res, next) {
    const targetAdd = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };

    const hashing = userService.hashedPassword(targetAdd.password);

    userService
      .register(targetAdd, hashing)
      .then((id) => {
        const sResponse = new Responses.SuccessResponse(id);
        res.status("201").json(sResponse);
      })
     
      // we want to confirm email with token // uuID it // insert it into the userToken table.
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }

  @Route("GET", "profilestatus")
  checkProfileStatus(req, res, next) {
    userService
      .checkProfileStatus(req.user.name)
      .then((response) => {
        let baseResponse = null;
        let code = 200;
        if (response.id) {
          baseResponse = new Responses.ItemResponse(response.id);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("No Profile");
        }
        res.status(code).json(baseResponse);
      })
      .catch((err) => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }
  @Route("GET", "profileby/:userId(\\d+)")
  profileBy(req, res, next) {
    userService
      .profileBy(req.params.userId)
      .then((response) => {
        let baseResponse = null;
        let code = 200;
        if (response) {
          baseResponse = new Responses.ItemResponse(response);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("No Profile");
        }
        res.status(code).json(baseResponse);
      })
      .catch((err) => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }

  @Route("POST", "initial/setup")
  initialSetup(req, res, next) {
    const targetAdd = {
      userId: req.user.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mi: req.body.mi,
      avatarUrl: req.body.avatarUrl,
      organizationTypeId: req.body.organizationTypeId,
      name: req.body.name,
      headline: req.body.headline,
      description: req.body.description,
      logo: req.body.logo,
      locationTypeId: req.body.locationTypeId,
      phone: req.body.phone,
      siteUrl: req.body.siteUrl,
      lineOne: req.body.lineOne,
      lineTwo: req.body.lineTwo,
      city: req.body.city,
      zip: req.body.zip,
      stateId: req.body.stateId,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    };
    userService
      .initialSetup(targetAdd)
      .then(() => {
        const sResponse = new Responses.SuccessResponse();
        res.status("200").json(sResponse);
      })
      .catch((err) => {
        res.status("500").json(new Responses.ErrorResponse(err));
      });
  }




}

module.exports = { controller: AuthController };
