This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# _Sabio_ Customizations

> Scroll for instructions on how to make ajax calls

## 👋 Logging in React - Say Goodbye to console.log

Look at how the `debug` module (aka logger) is implemented by viewing the console. The SabioInit component will help you set up your env/localStorage so that you can see the debug package in action.

The logger will allow you to turn on and off specific logger instances. You do this by specifying what namespaces you want to see. Different namespaces comma separated and can end in wildcards (aka \* )

Any namespace starting with &quot;sabio:Wild\*&quot; such as &quot;sabio:Wildcard&quot; or &quot;sabio:WildBill&quot; or just &quot;sabio:Wild&quot; will be shown.

Follow the instructions provide in the there with the help of the links below to further customize.

Change what is actually seen by changing the localStore key of "debug" to "sabio:\*" (do not use the quotes)

### How to change localStorage by hand

https://stackoverflow.com/questions/9404813/how-to-view-or-edit-localstorage

### Blackboxing the logger scripts

You will need to blackbox a coupele of scripts so that the console.log lines show up correctly.
When you have the logs from the debug/logging tool showing, click on the line that shows up to the right side of the console.

Once you open up that code file you will need to black box that file.
You will have to reload and the page and repeat the process for at least 2 times until the line numbers that up on the far right are the line numbes that you are expecting

https://developer.chrome.com/devtools/docs/blackboxing

---

## Complie Errors

This application is much more strict about the development practices you follow. The errors you will encounter will easily be explained with a quick google search.

> :warning: Do not disable these feature locally as the remote server will pick up many of the errors when you commit code.

### Prop-types

Prop types will be enforced. You can read more about them [on github](https://github.com/facebook/prop-types)

---

## The .env.development file

The start up scripts should have created a copy for you to modify and customize with your own user settings.

This file is not going to be pushed to the git server so you can edit freely without affecting other developers.

````
# ------------------------------------------------------------
# These settings are intended to be changed by each developer to customize the
# credentials their logged in user have while they interact with the application
# ------------------------------------------------------------
REACT_APP_TEMP_USER_ID="198"
REACT_APP_TEMP_USER_NAME="SabioFellow"
REACT_APP_TEMP_USER_ROLE="Developer"

# ------------------------------------------------------------
# These settings will probably not need to be managed by each developer differently.
#
# ------------------------------------------------------------
HTTPS=true

# ------------------------------------------------------------
# Api Endpoints
#

# These api endpoints will leverage cross site calls and will only work if CORS is set up correctly
# These are the default setting used by the application.
REACT_APP_API_HOST_PREFIX="https://localhost:50001"
REACT_APP_API_NODE_HOST_PREFIX="http://localhost:8080/node-api"
# To go through proxy put these swap out the last two api vars for these
# REACT_APP_API_HOST_PREFIX=""
# REACT_APP_API_NODE_HOST_PREFIX=""

# Enable for verbose logging from the sabio logging namespacing
REACT_APP_VERBOSE=true

# ------------------------------------------------------------
# Enable Api Endpoints tests at startup. The api's are enabled regardless of these flags
#
REACT_APP_DOT_NET_ENABLED=true
REACT_APP_NODE_ENABLED=true

---

## Ajax calls with Axios

- Make sure you search the wiki for the template axios call

- You have a working set of ajax calls inside the "/services/autoLoginService.js"

  - This file demonstrates calls to both the .net and node endpoints using the enviroment variables that are pulled from the .env files.
  - You need to look for the REACT_APP_API_HOST variables. There will be one for .net and one for node.

An example call may look like this:

```js
const create = payload => {
  const config = {
    method: "POST",
    // make note of the helpers.API_HOST_PREFIX
    url: helpers.API_HOST_PREFIX + "/api/blogs",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};
````

## Messages to user

### react-toastify

We will be using this package to give the user messages or feedback.
https://github.com/fkhadra/react-toastify

### sweetalert

We will be using this package to prompt the user to confirm any action that needs confirmation.
https://www.npmjs.com/package/sweetalert

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting
