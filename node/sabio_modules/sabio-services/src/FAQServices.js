const debug = require("sabio-debug");
const { dataProvider, TYPES } = require("sabio-data");
const _logger = debug.extend("console");
const Paged = require("sabio-models").Paged;

class FAQService {
  getAll(pageIndex, pageSize) {
    return new Promise(executer);

    function executer(resolve, reject) {
      let faq = null;
      const procName = "dbo.FAQs_SelectAll_V2";
      const returnParamMapper = null;

      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );
      function inputParamMapper(sqlParams) {}
      function singleRecordMapper(data, set) {
        if (!faq) {
          faq = [];
        }
        faq.push(data);
      }
      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        if (faq) {
          resolve(faq);
        }
      }
    }
  }

  getById(id) {
    return new Promise(executer);

    function executer(resolve, reject) {
      let faq = null;
      const procName = "dbo.FAQs_SelectById";
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
        faq = data;
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }

        resolve(faq);
      }
    }
  }

  getByCreatedBy(createdBy, pageIndex, pageSize) {
    return new Promise(executer);

    function executer(resolve, reject) {
      let faq = null;
      let page = null;
      let totalCount = 0;
      const procName = "dbo.FAQs_SelectByCreatedBy";
      const returnParamMapper = null;

      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );
      function inputParamMapper(sqlParams) {
        sqlParams.input("CreatedBy", TYPES.Int, createdBy);
        sqlParams.input("PageIndex", TYPES.Int, pageIndex);
        sqlParams.input("PageSize", TYPES.Int, pageSize);
      }
      function singleRecordMapper(data, set) {
        if (!faq) {
          faq = [];
        }
        totalCount = data.totalCount;
        delete data.totalCount;
        faq.push(data);
      }
      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        if (faq) {
          page = new Paged(faq, pageIndex, pageSize, totalCount);
        }
        resolve(page);
      }
    }
  }

  add(model, userId) {
    return new Promise(executor);

    function executor(resolve, reject) {
      const procName = "dbo.FAQs_Insert";
      let faqId = null;
      dataProvider.executeNonQuery(
        procName,
        inputParamMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        inputCommonParams(sqlParams, model);

        sqlParams.input("CreatedBy", TYPES.Int, userId);
        sqlParams.input("ModifiedBy", TYPES.Int, userId);

        sqlParams.output("Id", TYPES.Int);
      }

      function returnParamMapper(returnParams) {
        _logger(returnParams);

        if (returnParams) {
          faqId = returnParams.id;
        }
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }

        resolve(faqId);
      }
    }
  }

  update(id, userId, model) {
    return new Promise(executor);

    function executor(resolve, reject) {
      const procName = "dbo.FAQs_Update";

      const returnParamMapper = null;

      dataProvider.executeNonQuery(
        procName,
        inputParamMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        inputCommonParams(sqlParams, model);

        sqlParams.input("ModifiedBy", TYPES.Int, userId);

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
      const procName = "dbo.FAQs_DeleteById";

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
}
function inputCommonParams(sqlParams, model) {
  sqlParams.input("Question", TYPES.VarChar, model.question);
  sqlParams.input("Answer", TYPES.VarChar, model.answer);
  sqlParams.input("CategoryId", TYPES.Int, model.categoryId);
  sqlParams.input("SortOrder", TYPES.Int, model.sortOrder);
}

const service = new FAQService();

module.exports = service;
