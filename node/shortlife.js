/* eslint-disable no-console */
/* eslint-disable no-global-assign */
const expressApp = require("./.compiled/server.js");

let totalCounts = 0;

if (expressApp._server) {
  totalCounts++;
}
if (expressApp._server) {
  totalCounts++;
}

console.log(process.pid);

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");

  if (expressApp._server) {
    expressApp._server.close(() => {
      console.log("Http server closed.");
      totalCounts--;
      if (totalCounts === 0) {
        process.exit(0);
      }
    });
  }

  if (expressApp._secureServer) {
    expressApp._secureServer.close(() => {
      console.log("Https secure server closed.");
      totalCounts--;
      if (totalCounts === 0) {
        process.exit(0);
      }
    });
  }
});

setTimeout(() => {
  if (expressApp._server) {
    expressApp._server.close(() => {
      console.log("Http server closed.");
      totalCounts--;
      if (totalCounts === 0) {
        process.exit(0);
      }
    });
  }

  if (expressApp._secureServer) {
    expressApp._secureServer.close(() => {
      console.log("Https Secure server closed.");
      totalCounts--;
      if (totalCounts === 0) {
        process.exit(0);
      }
    });
  }

  //expressApp._server.close();
}, 1500);

module.exports = expressApp;
