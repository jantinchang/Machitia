const authenticationService = require("./AuthenticationService");
const { logger } = require("./common");
const { dataProvider, TYPES } = require("sabio-data");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
var salt = bcrypt.genSaltSync(10);
const _logger = logger.extend("user");
const sgMail = require('@sendgrid/mail');
const domain = process.env.DOMAIN;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);



class UserService {
  logIn(res, userRequest) {
    _logger("login called");

    return new Promise((resolve) => {
      authenticationService.authenticate(res, userRequest);
      resolve();
    });
  }

  logOut(res, userRequest) {
    return new Promise((resolve) => {
      authenticationService.logOut(res);
      resolve();
    });
  }

  getCurrentUser(req) {
    return new Promise((resolve) => {
      const currentUser = authenticationService.getCurrentUser(req);
      resolve(currentUser);
    });
  }

  userLogIn(res, userEmail, userPasswordInput) {
    return new Promise(executer);

    function executer(resolve, reject) {
      let user = null;
      const procName = "dbo.Users_LogIn";
      const returnParamMapper = null;

      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        sqlParams.input("email", TYPES.NVarChar, userEmail);
      }

      function singleRecordMapper(data, set) {
        // Need this If statement to check if there is userProfile info.
        if (data) {
          user = data;
          let roles = JSON.parse(user.roles);
          user.roles = roles.map((role) => role.Name);

          let bool = bcrypt.compareSync(userPasswordInput, user.password);

          if (bool) {
            authenticationService.authenticate(res, user);
          } else {
            reject("Password doesn't match.");
          }
        } else {
          _logger("please create userProfile"); // should reject here as well.
        }
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }

        resolve(user);
      }
    }
  }

  getStatusByEmail(email) {
    return new Promise(executer);

    function executer(resolve, reject) {
      let status = null;
      const procName = "dbo.Users_StatusCheck";
      const returnParamMapper = null;

      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        sqlParams.input("Email", TYPES.NVarChar, email);
      }

      function singleRecordMapper(data, set) {
        status = data;
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }

        resolve(status);
      }
    }
  }

  hashedPassword(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, salt);
  }

  register(targetAdd, hashedPassword) {
    return new Promise(executor);

    function executor(resolve, reject) {
      const procName = "dbo.Users_Register_V2";
      let userId = null;
      let token = uuidv4();
      dataProvider.executeNonQuery(
        procName,
        inputParamMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        sqlParams.input("Email", TYPES.NVarChar, targetAdd.email);
        sqlParams.input("Password", TYPES.VarChar, hashedPassword);
        sqlParams.input("Role", TYPES.Int, targetAdd.role);
        sqlParams.input("IsConfirmed", TYPES.Bit, 0);
        sqlParams.input("UserStatusId", TYPES.Int, 3);
        sqlParams.input("UserToken", TYPES.NVarChar, token);
        sqlParams.input("TokenType", TYPES.Int, 1);

        sqlParams.output("Id", TYPES.Int);
      }

      function returnParamMapper(returnParam) {
        
        const msg = {
          to: targetAdd.email,
          from: 'support@machitia.com', // Use the email address or domain you verified above
          subject: 'Please Confirm Your Email',
          html: `<!DOCTYPE html>
          <html>
          
          <head>
              <title></title>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <style type="text/css">
                  @media screen {
                      @font-face {
                          font-family: 'Lato';
                          font-style: normal;
                          font-weight: 400;
                          src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                      }
          
                      @font-face {
                          font-family: 'Lato';
                          font-style: normal;
                          font-weight: 700;
                          src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                      }
          
                      @font-face {
                          font-family: 'Lato';
                          font-style: italic;
                          font-weight: 400;
                          src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                      }
          
                      @font-face {
                          font-family: 'Lato';
                          font-style: italic;
                          font-weight: 700;
                          src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                      }
                  }
          
                  /* CLIENT-SPECIFIC STYLES */
                  body,
                  table,
                  td,
                  a {
                      -webkit-text-size-adjust: 100%;
                      -ms-text-size-adjust: 100%;
                  }
          
                  table,
                  td {
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                  }
          
                  img {
                      -ms-interpolation-mode: bicubic;
                  }
          
                  /* RESET STYLES */
                  img {
                      border: 0;
                      height: auto;
                      line-height: 100%;
                      outline: none;
                      text-decoration: none;
                  }
          
                  table {
                      border-collapse: collapse !important;
                  }
          
                  body {
                      height: 100% !important;
                      margin: 0 !important;
                      padding: 0 !important;
                      width: 100% !important;
                  }
          
                  /* iOS BLUE LINKS */
                  a[x-apple-data-detectors] {
                      color: inherit !important;
                      text-decoration: none !important;
                      font-size: inherit !important;
                      font-family: inherit !important;
                      font-weight: inherit !important;
                      line-height: inherit !important;
                  }
          
                  /* MOBILE STYLES */
                  @media screen and (max-width:600px) {
                      h1 {
                          font-size: 32px !important;
                          line-height: 32px !important;
                      }
                  }
          
                  /* ANDROID CENTER FIX */
                  div[style*="margin: 16px 0;"] {
                      margin: 0 !important;
                  }
              </style>
          </head>
          
          <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
              <!-- HIDDEN PREHEADER TEXT -->
              <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <!-- LOGO -->
                  <tr>
                      <td bgcolor="#FFA73B" align="center">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                      <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <p style="margin: 0;">Welcome to Machitia! First, you need to confirm your account. Just press the button below.</p>
                                  </td>
                              </tr>
                              <tr>
                                  <td bgcolor="#ffffff" align="left">
                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                              <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                  <table border="0" cellspacing="0" cellpadding="0">
                                                      <tr>
                                                          <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href='${domain}/confirm/${token}' target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm Account</a></td>
                                                      </tr>
                                                  </table>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr> <!-- COPY -->
                              <tr>
                                  <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                                  </td>
                              </tr> <!-- COPY -->
                              <tr>
                                  <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">https://bit.li.utlddssdstueincx</a></p>
                                  </td>
                              </tr>
                              <tr>
                                  <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                                  </td>
                              </tr>
                              <tr>
                                  <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <p style="margin: 0;">Cheers,<br>Machitia</p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                                      <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                      <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </body>
          
          </html>
      `,
        };

        if (returnParam) {
          userId = returnParam.id;
          sgMail.send(msg)
        }
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        resolve(userId);
      }
    }
  }

  checkProfileStatus(email) {
    return new Promise(executer);

    function executer(resolve, reject) {
      let id = 0;
      const procName = "dbo.Users_CheckProfileByEmail";
      const returnParamMapper = null;

      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        sqlParams.input("Email", TYPES.NVarChar, email);
      }

      function singleRecordMapper(data, set) {
        id = data;
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }

        resolve(id);
      }
    }
  }

  updateConfirmation(token) {
    return new Promise(executor);

    function executor(resolve, reject) {

      const procName = "dbo.Users_ActivateUserByToken";
      const returnParamMapper = null;

      dataProvider.executeNonQuery(
        procName,
        inputParamMapper,
        returnParamMapper,
        onCompleted)

      function inputParamMapper(sqlParams) {
        sqlParams.input("UserToken", TYPES.NVarChar, token);
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err)
          return;
        }

        resolve();
      }
    }
  }

  profileBy(userId) {
    return new Promise(executer);

    function executer(resolve, reject) {
      let profile = null;
      const procName = "dbo.UserProfiles_SelectByUserId";
      const returnParamMapper = null;

      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        sqlParams.input("userId", TYPES.Int, userId);
      }

      function singleRecordMapper(data, set) {
        profile = data;
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }

        resolve(profile);
      }
    }
  }

  initialSetup(targetAdd) {
    return new Promise(executor);

    function executor(resolve, reject) {
      const procName = "UserProfilesAndOrganization_Insert";
      let userId = null;
      dataProvider.executeNonQuery(
        procName,
        inputParamMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        sqlParams.input("UserId", TYPES.Int, targetAdd.userId);
        sqlParams.input("FirstName", TYPES.NVarChar, targetAdd.firstName);
        sqlParams.input("LastName", TYPES.NVarChar, targetAdd.lastName);
        sqlParams.input("Mi", TYPES.NVarChar, targetAdd.mi);
        sqlParams.input("AvatarUrl", TYPES.NVarChar, targetAdd.avatarUrl);
        sqlParams.input("OrganizationTypeId", TYPES.Int, targetAdd.organizationTypeId);
        sqlParams.input("Name", TYPES.NVarChar, targetAdd.name);
        sqlParams.input("Headline", TYPES.NVarChar, targetAdd.headline);
        sqlParams.input("Description", TYPES.NVarChar, targetAdd.description);
        sqlParams.input("Logo", TYPES.NVarChar, targetAdd.logo);
        sqlParams.input("LocationTypeId", TYPES.Int, targetAdd.locationTypeId);
        sqlParams.input("Phone", TYPES.NVarChar, targetAdd.phone);
        sqlParams.input("SiteUrl", TYPES.NVarChar, targetAdd.siteUrl);
        sqlParams.input("LineOne", TYPES.NVarChar, targetAdd.lineOne);
        sqlParams.input("LineTwo", TYPES.NVarChar, targetAdd.lineTwo);
        sqlParams.input("City", TYPES.NVarChar, targetAdd.city);
        sqlParams.input("Zip", TYPES.NVarChar, targetAdd.zip);
        sqlParams.input("StateId", TYPES.Int, targetAdd.stateId);
        sqlParams.input("Latitude", TYPES.Float, targetAdd.latitude);
        sqlParams.input("Longitude", TYPES.Float, targetAdd.longitude);
      }

      function returnParamMapper(returnParam) {
        _logger(returnParam);

        if (returnParam) {
          userId = returnParam.id;
        }
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        resolve(userId);
      }
    }
  }



}

const userService = new UserService();

module.exports = userService;
