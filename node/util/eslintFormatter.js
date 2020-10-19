/* eslint-disable indent */
/**
 * Based on Stylish reporter from Sindre Sorhus
 */
"use strict";

var chalk = require("chalk");
var stripAnsi = require("strip-ansi");
var table = require("text-table");
var extend = require("extend");
var path = require("path");
var process = require("process");
var fs = require("fs");
var codeFrame = require("babel-code-frame");

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Given a word and a count, append an s if count is not one.
 * @param {string} word A word in its singular form.
 * @param {int} count A number controlling whether word should be pluralized.
 * @returns {string} The original word with an s on the end if count is not one.
 */
function pluralize(word, count) {
  return count === 1 ? word : word + "s";
}

var parseBoolEnvVar = function(varName) {
  var env = process.env || {};
  return env[varName] === "true";
};

var parseEnvVal = function(varName) {
  var env = process.env || {};
  return env[varName];
};

var subtleLog = function(args) {
  return parseBoolEnvVar("EFF_NO_GRAY") ? args : chalk.gray(args);
};

var getEnvVar = function(varName) {
  var env = process.env || {};
  return env[varName] || false;
};

var getFileLink = function(_path, line, column) {
  var scheme = getEnvVar("EFF_EDITOR_SCHEME");
  if (scheme === false) {
    return false;
  }
  return scheme
    .replace("{file}", encodeURIComponent(_path))
    .replace("{line}", line)
    .replace("{column}", column);
};

var getKeyLink = function(key) {
  var noLinkRules = parseBoolEnvVar("EFF_NO_LINK_RULES");
  var url =
    key.indexOf("/") > -1
      ? "https://google.com/#q="
      : "http://eslint.org/docs/rules/";
  return !noLinkRules
    ? chalk.underline(subtleLog(url + chalk.white(encodeURIComponent(key))))
    : chalk.white(key);
};

var printSummary = function(hash, title, method) {
  var res = "\n\n" + chalk[method](title + ":") + chalk.white("\n");
  res += table(
    Object.keys(hash)
      .sort(function(a, b) {
        return hash[a] > hash[b] ? -1 : 1;
      })
      .map(function(key) {
        return ["", hash[key], getKeyLink(key)];
      }),
    {
      align: ["", "r", "l"],
      stringLength: function(str) {
        return stripAnsi(str).length;
      }
    }
  );
  return res;
};

// ------------------------------------------------------------------------------
// Public Interface
// ------------------------------------------------------------------------------

module.exports = function(results) {
  var output = "\n";

  var total = 0;

  var errors = 0;

  var warnings = 0;

  var summaryColor = "yellow";

  results = results || [];

  var entries = [];

  var absolutePathsToFile = parseBoolEnvVar("EFF_ABSOLUTE_PATHS");

  var groupByIssue = parseBoolEnvVar("EFF_BY_ISSUE");
  var filterRule = parseEnvVal("EFF_FILTER");
  var showSource = !parseBoolEnvVar("EFF_NO_SOURCE");

  var errorsHash = {};
  var warningsHash = {};

  results.forEach(function(result) {
    var messages = result.messages || [];
    const fileSource =
      result.source || fs.readFileSync(result.filePath, "utf8");
    entries = entries.concat(
      messages.map(function(message) {
        return extend(
          {
            filePath: absolutePathsToFile
              ? path.resolve(result.filePath)
              : path.relative(".", result.filePath)
          },
          message,
          {
            fileSource
          }
        );
      })
    );
  });

  entries.sort(function(a, b) {
    if (a.severity > b.severity) {
      return 1;
    }
    if (a.severity < b.severity) {
      return -1;
    }

    if (groupByIssue) {
      if (a.ruleId > b.ruleId) {
        return 1;
      }
      if (a.ruleId < b.ruleId) {
        return -1;
      }
    }

    var pathSort = a.filePath.localeCompare(b.filePath);
    if (pathSort) {
      return pathSort;
    }

    if (a.line > b.line) {
      return 1;
    }
    if (a.line < b.line) {
      return -1;
    }

    if (a.column > b.column) {
      return 1;
    }
    if (a.column < b.column) {
      return -1;
    }

    return 0;
  });

  // entries = entries.slice(0, 1);

  var lastRuleId;
  let runningCount = 0;
  output +=
    entries
      .reduce(function(seq, message) {
        var messageType;
        if (filterRule) {
          if (message.ruleId !== filterRule) {
            return seq;
          }
        }

        if (message.fatal || message.severity === 2) {
          messageType = chalk.red("✘");
          summaryColor = "red";
          errorsHash[message.ruleId] = (errorsHash[message.ruleId] || 0) + 1;
          errors++;
        } else {
          messageType = chalk.yellow("⚠️");
          warningsHash[message.ruleId] =
            (warningsHash[message.ruleId] || 0) + 1;
          warnings++;
        }

        var line = message.line || 0;
        var column = message.column || 0;

        var filePath = message.filePath;
        var link = getFileLink(filePath, line, column);
        var filename = subtleLog(filePath + ":" + line + ":" + column);

        function renderTitle() {
          return (
            "\n      " + messageType + "  " + getKeyLink(message.ruleId || "")
          );
        }

        function renderLink() {
          return link === false
            ? ""
            : "     " + chalk.underline(subtleLog(link));
        }

        function renderDescription() {
          ++runningCount;
          // console.log(message);
          return (
            `` +
            chalk.bold[summaryColor](
              `${runningCount}) ` + message.message.replace(/\.$/, "")
            )
          ); // + "\n";
        }

        function renderFileLink() {
          return (
            (showSource ? "\n" : "") +
            "     " +
            (link === false ? chalk.underline(filename) : filename) +
            "\n"
          );
        }

        function renderSourceCode() {
          const hlite = {
            highlightCode: true
          };
          return showSource
            ? codeFrame(message.fileSource, message.line, message.column, hlite)
                // eslint-disable-next-line indent
                .split("\n")
                .map(l => "   " + l)
                .join("\n")
            : "";
        }

        function createLine(arr) {
          return arr
            .filter(function(l) {
              return !!(l || "").trim().replace("\r\n", "");
            })
            .join(""); // .join("\n");
        }

        if (groupByIssue) {
          var isSameIssueAsLastOne = lastRuleId === message.ruleId;
          lastRuleId = message.ruleId;

          seq.push(
            createLine([
              !isSameIssueAsLastOne ? renderTitle() : "",
              !isSameIssueAsLastOne ? renderLink() : "",
              !isSameIssueAsLastOne ? renderDescription() : "",
              renderFileLink(),
              renderSourceCode()
            ])
          );
        } else {
          seq.push(
            createLine([
              // renderTitle(),
              // renderLink(),
              renderDescription(),
              renderFileLink(),
              renderSourceCode(),
              table([[renderTitle()], [renderLink()]]),
              "---------------------------------------------------------------------------\n"
            ])
          );
        }

        return seq;
      }, [])
      .join("\n") + "\n\n";

  total = entries.length;

  if (total > 0) {
    output += "-------------   Summary   ----------------------\n";
    output += chalk[summaryColor].bold(
      [
        "✘ ",
        total,
        pluralize(" problem", total),
        " (",
        errors,
        pluralize(" error", errors),
        ", ",
        warnings,
        pluralize(" warning", warnings),
        ")"
      ].join("")
    );

    if (errors > 0) {
      output += printSummary(errorsHash, "Errors", "red");
    }

    if (warnings > 0) {
      output += printSummary(warningsHash, "⚠️  Warnings", "yellow") + "\n";
    }

    output += "\n";
  }

  if (
    process.env.FORCE_ITERM_HINT === "true" ||
    (process.stdout.isTTY && !process.env.CI)
  ) {
    output = "\u001B]1337;CurrentDir=" + process.cwd() + "\u0007" + output;
  }

  return total > 0 ? output : "";
};
