const { dataProvider: provider, TYPES } = require("../src");
const sql = require("mssql");
const debug = require("sabio-debug");

const _logger = debug.extend("tests:sabio:data:provider");
const chalk = require("chalk");

procSelectMultipleOutPut();
two();
three();
selectMultipleOutPut();
selectSingleOutPut();
insertViaBatch();
insertViaBatchProc();

function insertViaBatch() {
  const testName = "insertViaBatch";
  provider.executeNonQuery(
    "dbo.Insert_Batch",
    inputParamsOneInsert(testName),
    returnParameters(testName),
    onCallCompleted(testName, false)
  );

  function inputParamsOneInsert(testName) {
    return function(request) {
      const tvp = new sql.Table();

      // Columns must correspond with type we have created in database.
      const dbType = sql.NVarChar(50);
      tvp.columns.add("Data", dbType);

      tvp.rows.add("Danny");
      tvp.rows.add("Hector");

      request.input("Names", tvp);
    };
  }
}

function insertViaBatchProc() {
  const testName = "insertViaBatch";
  // provider.executeNonQuery(
  //   "dbo.Insert_Batch",
  //   inputParamsOneInsert(testName),
  //   returnParameters(testName),
  //   onCallCompleted(testName, false)
  // );

  provider
    .executeProc(
      "[dbo].Insert_Batch",
      inputParamsOneInsert(testName),
      infoLog(testName), //just log the output params
      null
    )
    .then(onSuccess(testName))
    .catch(function(err) {
      _logger(chalk.red("caught exception - Sabio_Addresses_SelectRandom50"));
      _logger(err);
    });

  function inputParamsOneInsert(testName) {
    return function(request) {
      const tvp = new sql.Table();

      // Columns must correspond with type we have created in database.
      const dbType = sql.NVarChar(50);
      tvp.columns.add("Data", dbType);

      tvp.rows.add("Karen");
      tvp.rows.add("John");

      request.input("Names", tvp);
    };
  }
}

function three() {
  const testName = "three";
  provider.executeNonQuery(
    "dbo.One_Insert",
    inputParamsOneInsert(testName),
    returnParameters(testName),
    onCallCompleted(testName, false)
  );

  function inputParamsOneInsert(testName) {
    return function(request) {
      request.input("name", TYPES.NVarChar(50), "A Name");
      request.output("Id", TYPES.Int);
    };
  }
}

function selectSingleOutPut() {
  const testName = "Test:executeCmd selectSingleOutPut";
  const completCallBack = onCallCompleted(testName, true);
  const goodLogger = goodLog(testName);

  provider.executeCmd(
    "[dbo].[Sabio_Addresses_SelectById]",
    mapInputParams(),
    singleRecordMapper(testName),
    infoLog(testName),
    completCallBack
  );

  function singleRecordMapper(testName) {
    return function(data, set) {
      _logger(
        chalk.yellow(`---------------------------------------------------------
-- New Single Record Below ${testName}
          `)
      );
      goodLogger({ set, data });
      _logger(
        chalk.blue(`
-- ---------------------------- --------------- --------------
`)
      );
    };
  }

  function mapInputParams() {
    return function(req) {
      req.input("Id", TYPES.Int, 500);
    };
  }

  // function inputParamsOneInsert(testName) {
  //   return function(request) {
  //     request.input("name", TYPES.NVarChar(50), "A Name");
  //     request.output("Id", TYPES.Int);
  //   };
  // }
}

function selectMultipleOutPut() {
  const testName = "Test:executeCmd selectMultiple OutPut";
  const completCallBack = onCallCompleted(testName, true);
  const goodLogger = goodLog(testName);

  provider.executeCmd(
    "[dbo].[Sabio_Addresses_SelectRandom50]",
    mapInputParams(),
    singleRecordMapper(testName),
    infoLog(testName),
    completCallBack
  );

  function singleRecordMapper(testName) {
    return function(data, set) {
      _logger(
        chalk.yellow(`---------------------------------------------------------
-- New Single Record Below ${testName}
          `)
      );
      goodLogger({ set, data });
      _logger(
        chalk.blue(`
-- ---------------------------- --------------- --------------
`)
      );
    };
  }

  function mapInputParams() {
    return function(req) {
      req.output("TestOutPut", TYPES.Int);
    };
  }

  // function inputParamsOneInsert(testName) {
  //   return function(request) {
  //     request.input("name", TYPES.NVarChar(50), "A Name");
  //     request.output("Id", TYPES.Int);
  //   };
  // }
}

function procSelectMultipleOutPut() {
  const testName = "procSelectMultipleOutPut";
  provider
    .executeProc(
      "[dbo].[Sabio_Addresses_SelectRandom50]",
      function(req) {
        req.output("TestOutPut", TYPES.Int);
      },
      infoLog(testName), //just log the output params
      null
    )
    .then(onSuccess(testName))
    .catch(function(err) {
      _logger(chalk.red("caught exception - Sabio_Addresses_SelectRandom50"));
      _logger(err);
    });
}

function two() {
  const testName = "two";
  provider
    .executeProc("dbo.One_Insert", function(request) {
      request.input("name", TYPES.NVarChar(50), "A Name");
      request.output("Id", TYPES.Int);
    })
    .then(onSuccess)
    .catch(onCallCompleted(testName, true));
}

function onSuccess(testName) {
  return function(data) {
    const msg = JSON.stringify(data, null, 2);
    _logger(`
TestName: ${chalk.underline.blue(testName)}
onSuccess: ${chalk.green(msg)}
`);
  };
}

function toString(data) {
  return JSON.stringify(data, null, 2);
}

function infoLog(testName) {
  return (data) => {
    const msg = JSON.stringify(data, null, 2);
    _logger(`
TestName: ${chalk.underline.blue(testName)}
data: ${chalk.blue(msg)}
`);
  };
}

function goodLog(testName) {
  return (data) => {
    const msg = JSON.stringify(data, null, 2);
    _logger(`
TestName: ${chalk.underline.blue(testName)}
data: ${chalk.blue(msg)}
`);
  };
}

function onCallCompleted(testName, logOk) {
  return function(err, response) {
    if (err) {
      _logger(chalk.red("on complete err with" + testName));
      _logger(chalk.red(toString(err)));
    } else {
      _logger(chalk.green("on complete OK:" + testName));
    }
    if (logOk) {
      _logger(chalk.green(toString(response)));
    }
  };
}

function returnParameters() {
  return function(returnParams) {
    _logger(chalk.blue("returnParams"));
    _logger(toString(returnParams));
  };
}
