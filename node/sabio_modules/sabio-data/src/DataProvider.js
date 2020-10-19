const { ConnectionPool, TYPES, sql } = require("mssql");
const config = require("dotenv");
const databaseRequest = require("./databaseRequest");
const debug = require("sabio-debug");
const chalk = require("chalk");
/* For Help:
  http://tediousjs.github.io/tedious/parameters.html

  https://github.com/tediousjs/tedious

  TYPES
  http://tediousjs.github.io/tedious/api-datatypes.html
*/

config.config();

const proDebug = debug.extend("data:provider");

const pool = configurePool();

function DataProvider() {
  this.executeProc = executeProc;
  this.executeNonQuery = executeNonQuery;
  this.executeCmd = executeCmd;
  this.ping = ping;

  function executeProc(
    procName,
    inputParamMapper,
    returnParameters,
    cmdModifier
  ) {
    const isDirectProcCall = true;
    return new Promise((resolve, reject) => {
      pool.then(onAcquire).catch((err) => {
        reject(err);
      });

      function onAcquire(conn) {
        databaseRequest({
          resolve,
          reject,
          conn,
          procName,
          inputParamMapper,
          cmdModifier,
          isDirectProcCall,
          returnParameters,
        });
      }
    });
  }

  function executeNonQuery(
    procName,
    inputParamMapper,
    returnParameters,
    onCompleteCallback
  ) {
    pool.then(onPoolAcquired).catch((err) => {
      onCompleteCallback(err);
    });
    // let cmdModifier = null;
    function onPoolAcquired(conn) {
      databaseRequest({
        onCompleteCallback,
        conn,
        procName,
        inputParamMapper,
        returnParameters,
      });
    }
  }

  function executeCmd(
    procName,
    inputParamMapper,
    singleRecordMapper,
    returnParameters,
    onCompleteCallback
  ) {
    pool.then(onPoolAcquired).catch((err) => {
      onCompleteCallback(err);
    });
    // let cmdModifier = null;
    function onPoolAcquired(conn) {
      databaseRequest({
        onCompleteCallback,
        conn,
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParameters,
      });
    }
  }

  function ping() {
    return new Promise((resolve, reject) => {
      pool.then(onAcquire).catch((err) => {
        reject(err);
      });

      function onAcquire() {
        resolve({ ping: true });
      }
    });
  }
}

async function configurePool(connectionString, opts, onError) {
  opts = opts || {};
  const connString = connectionString || process.env.SQL_ConnectionString;

  if (!connString || connString.length <= 1) {
    throw new Error("A valid SQL Connection string was not provied");
  }

  const poolConfig = {
    min: opts.SQL_POOL_MIN || process.env.SQL_POOL_MIN || 2,
    max: opts.SQL_POOL_MAX || process.env.SQL_POOL_MAX || 5,
    log: true,
  };
  const conObject = {};

  connString.split(";").forEach(function(part) {
    const segments = part.split("=");
    const keyLower = segments[0].toLowerCase();

    conObject[keyLower] = segments[1];
  });

  const configMsSql = {
    user: conObject["user id"],
    password: conObject.password,
    server: conObject["data source"] || conObject["server"],
    database: conObject["initial catalog"] || conObject.database,
    instanceName: conObject["instance"],
    pool: {
      max: poolConfig.max,
      min: poolConfig.min,
      idleTimeoutMillis: 30000,
    },
    appName: "sabio",
    stream: true,
    parseJSON: true,
    camelCaseColumns: true,
    rowCollectionOnDone: true,
    rowCollectionOnRequestCompletion: true,
    options: {
      appName: "sabio",
      stream: true,
      parseJSON: true,
      camelCaseColumns: true,
      rowCollectionOnDone: true,
      rowCollectionOnRequestCompletion: true,
    },
  };

  proDebug("Using Config");
  proDebug(chalk.blue(JSON.stringify(configMsSql, null, 2)));

  const pool = new ConnectionPool(configMsSql);
  await pool.connect();

  pool.on("error", onErrorLocal);

  function onErrorLocal(err) {
    proDebug("Error in Data Provider");
    proDebug(err);
    if (onError) {
      onError(err);
    }
  }

  return pool;
}

const dataProvider = new DataProvider();

module.exports = { dataProvider, TYPES, sql };
