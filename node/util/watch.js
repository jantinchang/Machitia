/* eslint-disable no-console */
var chokidar = require("chokidar");
// One-liner for current directory, ignores .dotfiles

setTimeout(function() {
  console.log("...watching.....\n");
  let countOfEvents = 0;

  setTimeout(function() {
    console.log(
      "⚠️  ------- New Files may not be picked up by the file watcher. You will have to stop and start babel.  -------  ⚠️"
    );
  }, 1000);

  chokidar.watch(".compiled/").on("all", (event, path) => {
    console.debug(`${countOfEvents++}) ${event} ${path}`);
  });
}, 6000);
