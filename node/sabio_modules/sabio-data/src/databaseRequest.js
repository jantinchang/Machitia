const camelCase = require("camelcase");
const debug = require("sabio-debug");

const debugReq = debug.extend("data:request");
const debugRows = debug.extend("data:rows");

function databaseRequest({
  resolve,
  reject,
  onCompleteCallback,
  conn,
  procName,
  inputParamMapper,
  singleRecordMapper,
  returnParameters,
  cmdModifier,
  isDirectProcCall,
}) {
  let setIndex = -1;
  let globalError = false;
  const errMessage = null;
  // eslint-disable-next-line no-unneeded-ternary
  const isPromiseBased = resolve && reject ? true : false;
  const response = { resultSetCount: 0 };

  debugReq(`DatabaseRequest called for ${procName}`);

  const request = conn.request(); // new Request(conn);
  request.stream = true;

  conn.on("row", onRowReceived);
  conn.on("returnValue", onReturnParamValueReceived);
  conn.on("recordset", onRecordSetReceived);

  request.on("error", onRequestError);
  request.on("row", onRowReceived);
  request.on("returnValue", onReturnParamValueReceived);
  request.on("recordset", onRecordSetReceived);

  request.on("columnMetadata", onRecordSetReceived);

  if (isDirectProcCall) {
    request.on("done", onStoredProcDone);
  } else {
    request.on("done", onRequestCompleted);
  }
  if (cmdModifier) {
    cmdModifier();
  }

  if (inputParamMapper) {
    inputParamMapper(request);
  }

  request.execute(procName);
  // .then((recordsets, recordset, output, rowsAffected, returnValue) => {
  //   debugReq("execute>then", recordsets);
  //   resolve({ recordsets, recordset, output, rowsAffected, returnValue });
  // });

  function onRowReceived(columns) {
    debugRows("onRowReceived", columns);
    if (globalError) {
      return;
    }

    response.resultSets = response.resultSets || [];
    response.resultSets[setIndex] = response.resultSets[setIndex] || [];

    // const row = {};
    //columns.map((column, ordina) => mapColumnsToRow(column, ordina, row));

    //mapObjectToRow(columns, row);
    response.resultSets[setIndex].push(columns);

    if (singleRecordMapper) {
      singleRecordMapper(columns, setIndex);
    }
  }

  // eslint-disable-next-line no-unused-vars
  function _mapObjectToRow(objColumns, row) {
    for (const key in objColumns) {
      if (!objColumns.hasOwnProperty(key)) {
        continue;
      }
      const element = objColumns[key];

      if (element === null) {
        row[key] = null;
      } else {
        row[key] = element;
      }
    }
  }
  // eslint-disable-next-line no-unused-vars
  function _mapColumnsToRow(column, ordinal, row) {
    const colName = column.metadata.colName ? column.metadata.colName : ordinal;

    if (typeof row[colName] !== "undefined") {
      return;
    }
    if (column.value === null) {
      row[colName] = null;
    } else {
      row[colName] = column.value;
    }
  }

  function onReturnParamValueReceived(paramName, value, metadata) {
    debugReq(`onReturnParamValueReceived ${paramName} = ${value}`);

    const name = camelCase(paramName);
    response.outputParameters = response.outputParameters || {};
    response.outputParametersMetaData = response.outputParametersMetaData || {};

    response.outputParameters[name] = value;
    response.outputParametersMetaData[name] = metadata;
  }

  function setReturnParams(response, oData) {
    debugReq(`setReturnParams`);
    let replacedParams = false;
    response.outputParameters = response.outputParameters || {};
    for (const key in oData) {
      if (oData.hasOwnProperty(key)) {
        const element = oData[key];
        const lKey = camelCase(key);
        response.outputParameters[lKey] = element;
        replacedParams = true;
      }
    }
    if (replacedParams) {
      delete response.output;
    }
  }

  function onRequestError(err) {
    //conn.release();
    if (err && err.name === "RequestError") {
      globalError = true;
      if (reject) {
        reject(err);
      } else if (onCompleteCallback) {
        onCompleteCallback(err);
      }
      return;
    }
  }

  function onRequestCompleted(data) {
    const { output, rowsAffected, returnValue } = data;
    let err;
    if (globalError) {
      return;
    }
    Object.assign(response, { output, rowsAffected, returnValue });

    if (isPromiseBased) {
      resolve(response);
      return;
    }

    // if we have not encounterd an error AND we can pass back outputParameters
    if (!globalError && returnParameters && response.output) {
      setReturnParams(response, response.output);

      returnParameters(response.outputParameters);
    }

    if (globalError && !err) {
      onCompleteCallback(
        "Error an ecountered during the processing of the request:" +
          errMessage,
        rowcount
      );
    } else {
      // callbacks will be invoked as expected in env: err first
      onCompleteCallback(err, response);
    }
  }
  function onStoredProcDone(storedProcDoneData) {
    if (globalError) {
      return;
    }
    response.storedProcDoneData = storedProcDoneData;
    if (response.storedProcDoneData && response.storedProcDoneData.output) {
      setReturnParams(response, response.storedProcDoneData.output);

      if (returnParameters && response.outputParameters) {
        returnParameters(response.outputParameters);
        if (response.storedProcDoneData && response.storedProcDoneData.output) {
          delete response.storedProcDoneData.output;
        }
      }
    }
    resolve(response);
  }
  function onRecordSetReceived() {
    response.resultSetCount++;
    setIndex++;
  }
}

module.exports = databaseRequest;
