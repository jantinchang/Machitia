const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api", { target: "https://localhost:50001/", secure: false }));
  app.use(
    proxy("/node-api", {
      target: "http://localhost:8080/node-api",
      secure: false
    })
  );
};
