const debug = require("sabio-debug");
const { dataProvider, TYPES } = require("sabio-data");
const _logger = debug.extend("console");
const Paged = require("sabio-models").Paged;
var path = require('path')

class FeedService {
  getById(id) {
    return new Promise(executer);

    function executer(resolve, reject) {
      let feed = null;
      const procName = "dbo.Feed_SelectById";
      const returnParamMapper = null;

      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        sqlParams.input("Id", TYPES.Int, id);
      }

      function singleRecordMapper(data, set) {
        feed = data;
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }

        resolve(feed);
      }
    }
  }

  getByCreatedBy(userId, pageIndex, pageSize) {
    return new Promise(executer);

    function executer(resolve, reject) {
      let feed = null;
      let page = null;
      let totalCount = 0;
      const procName = "dbo.Feed_SelectByCreatedBy";
      const returnParamMapper = null;

      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );
      function inputParamMapper(sqlParams) {
        sqlParams.input("CreatedBy", TYPES.Int, userId);
        sqlParams.input("PageIndex", TYPES.Int, pageIndex);
        sqlParams.input("PageSize", TYPES.Int, pageSize);
      }
      function singleRecordMapper(data, set) {
        if (!feed) {
          feed = [];
        }
        totalCount = data.totalCount;
        delete data.totalCount;
        feed.push(data);
      }
      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        if (feed) {
          page = new Paged(feed, pageIndex, pageSize, totalCount);
        }
        resolve(page);
      }
    }
  }

  insert(model, userId) {
    return new Promise(executor);

    function executor(resolve, reject) {
      const procName = "dbo.Feed_Insert_V2";
      let feedId = null;
      dataProvider.executeNonQuery(
        procName,
        inputParamMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        fileTypeSwitch(path.extname(model.url));
        inputCommonParams(sqlParams, model);

        sqlParams.input("FileTypeId", TYPES.Int, fileType);

        sqlParams.input("UserId", TYPES.Int, userId);

        sqlParams.output("Id", TYPES.Int);
        sqlParams.output("FileId", TYPES.Int);
      }

      function returnParamMapper(returnParams) {
        _logger(returnParams);

        if (returnParams) {
          feedId = returnParams.id;
        }
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }

        resolve(feedId);
      }
    }
  }

  update(id, model) {
    return new Promise(executor);

    function executor(resolve, reject) {
      const procName = "dbo.Feed_Update";

      const returnParamMapper = null;

      dataProvider.executeNonQuery(
        procName,
        inputParamMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        fileTypeSwitch(path.extname(model.url));
        inputCommonParams(sqlParams, model);

        sqlParams.input("FileTypeId", TYPES.Int, fileType);

        sqlParams.input("Id", TYPES.Int, id);
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      }
    }
  }

  delete(id) {
    return new Promise(executor);

    function executor(resolve, reject) {
      const procName = "dbo.Feed_DeleteById";

      const returnParamMapper = null;

      dataProvider.executeNonQuery(
        procName,
        inputParamMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        sqlParams.input("Id", TYPES.Int, id);
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      }
    }
  }

  getFollowerFeeds(userId){
    return new Promise(executer);

    function executer(resolve, reject) {
      let feed = null;
      const procName = "dbo.Feed_GetFollowersFeed";
      const returnParamMapper = null;

      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );
      function inputParamMapper(sqlParams) {
        sqlParams.input("currentUserId", TYPES.Int, userId);
      }
      function singleRecordMapper(data, set) {
        if (!feed) {
          feed = [];
        }
        feed.push(data);
      }
      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        if (feed) {
          resolve(feed);
        }
      }
    }
  }
}
function inputCommonParams(sqlParams, model) {
  sqlParams.input("Content", TYPES.VarChar, model.content);
  sqlParams.input("Url", TYPES.VarChar, model.url);
  sqlParams.input("FeedStatusId", TYPES.Int, model.feedStatusId);
}
function fileTypeSwitch(fileExt){
  switch (fileExt) {
    case ".png":
      fileType = 1;
      break;
    case ".jpg":
      fileType = 2;
      break;
    case ".jpeg":
      fileType = 2;
      break;
    case ".pdf":
      fileType = 3;
      break;
    case ".doc":
      fileType = 4;
      break;
    case ".docx":
      fileType = 5;
      break;
    case ".txt":
      fileType = 6;
      break;
    case ".mp3":
      fileType = 7;
      break;
    case ".zip":
      fileType = 8;
      break;
    case ".rar":
      fileType = 9;
      break;
    case ".bin":
      fileType = 10;
      break;
    case ".exe":
      fileType = 11;
      break;
    case ".gif":
      fileType = 12;
      break;
    case ".psd":
      fileType = 13;
      break;
    case ".ppt":
      fileType = 14;
      break;
    case "pptx":
      fileType = 15;
      break;
    case ".mp4":
      fileType = 16;
      break;
    case ".mkv":
      fileType = 17;
      break;
    case ".mov":
      fileType = 18;
      break;
    case ".xlsx":
      fileType = 19;
      break;
    case ".wav":
      fileType = 20;
      break;
  }
}

const service = new FeedService();

module.exports = service;
