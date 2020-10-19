const debug = require("sabio-debug");
const { dataProvider, TYPES } = require("sabio-data");
const _logger = debug.extend("planService");
const Paged = require("sabio-models").Paged;
const sql = require("mssql");

class PlanService {
  delete(id) {
    return new Promise(executor);
    function executor(resolve, reject) {
      const procName = "dbo.Plan_Delete";
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
  getAll(pageIndex, pageSize) {
    return new Promise(executer);
    function executer(resolve, reject) {
      let plans = null;
      let page = null;
      let totalCount = null;
      const procName = "dbo.Plan_SelectAll";
      const returnParamMapper = null;
      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );
      function inputParamMapper(sqlParams) {
        sqlParams.input("PageIndex", TYPES.Int, pageIndex);
        sqlParams.input("PageSize", TYPES.Int, pageSize);
      }
      function singleRecordMapper(data, set) {
        if (!plans) {
          plans = [];
        }
        totalCount = data.totalCount;
        delete data.totalCount;
        plans.push(data);
      }
      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        if (plans) {
          page = new Paged(plans, pageIndex, pageSize, totalCount);
        }
        resolve(page);
      }
    }
  }

  searchPlans(pageIndex, pageSize, query) {
    return new Promise(executer);
    function executer(resolve, reject) {
      let plans = null;
      let page = null;
      let totalCount = null;
      const procName = "dbo.Plan_Search_paginate";
      const returnParamMapper = null;
      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );
      function inputParamMapper(sqlParams) {
        sqlParams.input("PageIndex", TYPES.Int, pageIndex);
        sqlParams.input("PageSize", TYPES.Int, pageSize);
        sqlParams.input("Query", TYPES.NVarChar(50), query);
      }
      function singleRecordMapper(data, set) {
        if (!plans) {
          plans = [];
        }
        totalCount = data.totalCount;
        delete data.totalCount;
        plans.push(data);
      }
      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        if (plans) {
          page = new Paged(plans, pageIndex, pageSize, totalCount);
        }
        resolve(page);
      }
    }
  }

  getById(id) {
    return new Promise(executer);
    function executer(resolve, reject) {
      let plan = null;
      const procName = "dbo.Plan_SelectMultiByPlanId_V2";
      const returnParamMapper = null;
      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );
      function inputParamMapper(sqlParams) {
        sqlParams.input("PlanId", TYPES.Int, id);
      }
      function singleRecordMapper(data, set) {
        plan = data;
      }
      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        resolve(plan);
      }
    }
  }
  getByCreatedBy(userId, pageIndex, pageSize) {
    return new Promise(executer);
    function executer(resolve, reject) {
      let plans = null;
      let page = null;
      let totalCount = null;
      const procName = "dbo.Plan_SelectByCreatedBy";
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
        if (!plans) {
          plans = [];
        }
        totalCount = data.totalCount;
        delete data.totalCount;
        plans.push(data);
      }
      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        if (plans) {
          page = new Paged(plans, pageIndex, pageSize, totalCount);
        }
        resolve(page);
      }
    }
  }
  add(requestModel, id) {
    return new Promise(executor);
    function executor(resolve, reject) {
      const procName = "dbo.Plan_Multi_InsertV3";
      let planId = null;
      dataProvider.executeNonQuery(
        procName,
        inputParamMapper,
        returnParamMapper,
        onCompleted
      );
      function inputParamMapper(sqlParams) {
        inputCommonParams(sqlParams, requestModel, id);
        sqlParams.output("Id", TYPES.Int);
        sqlParams.output("ObjectiveId", TYPES.Int);
        sqlParams.output("PrepId", TYPES.Int);
      }
      function returnParamMapper(returnParam) {
        _logger(returnParam);
        if (returnParam) {
          planId = returnParam.id;
        }
      }
      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        resolve(planId);
      }
    }
  }
  update(requestModel, id) {
    return new Promise(executor);
    function executor(resolve, reject) {
      const procName = "dbo.Plan_Multi_Update";
      const returnParamMapper = null;
      dataProvider.executeNonQuery(
        procName,
        inputParamMapper,
        returnParamMapper,
        onCompleted
      );
      function inputParamMapper(sqlParams) {
        inputCommonParams(sqlParams, requestModel, id);
        sqlParams.input("Id", TYPES.Int, requestModel.id);
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
function setAgendas(sqlParams, model) {
  let tvp = new sql.Table();
  tvp.columns.add("AgendaTypeId", TYPES.Int);
  tvp.columns.add("Title", TYPES.NVarChar);
  tvp.columns.add("Duration", TYPES.NVarChar);
  tvp.columns.add("Tips", TYPES.NVarChar);
  tvp.columns.add("EducatorDoes", TYPES.NVarChar);
  tvp.columns.add("LearnerDoes", TYPES.NVarChar);
  for (let i = 0; i < model.length; i++) {
    tvp.rows.add(
      model[i].agendaTypeId,
      model[i].title,
      model[i].duration,
      model[i].tips,
      model[i].educatorDoes,
      model[i].learnerDoes
    );
  }
  sqlParams.input("Agendas", TYPES.TVP, tvp);
}
function inputCommonParams(sqlParams, requestModel, id) {
  sqlParams.input("Title", TYPES.NVarChar, requestModel.title);
  sqlParams.input("Subject", TYPES.NVarChar, requestModel.subject);
  sqlParams.input("Overview", TYPES.NVarChar, requestModel.overview);
  sqlParams.input("Duration", TYPES.NVarChar, requestModel.duration);
  sqlParams.input("PlanTypeId", TYPES.Int, requestModel.planTypeId);
  sqlParams.input("CoverImageUrl", TYPES.NVarChar, requestModel.coverImageUrl);
  sqlParams.input("UserId", TYPES.Int, id);
  sqlParams.input("Concepts", TYPES.NVarChar, requestModel.concepts);
  sqlParams.input("AbleTo", TYPES.NVarChar, requestModel.ableTo);
  sqlParams.input("Vocabulary", TYPES.NVarChar, requestModel.vocabulary);
  sqlParams.input("StandardTypeId", TYPES.Int, requestModel.standardTypeId);
  sqlParams.input("Prerequisites", TYPES.NVarChar, requestModel.prerequisites);
  sqlParams.input("Prep", TYPES.NVarChar, requestModel.prep);
  sqlParams.input("Materials", TYPES.NVarChar, requestModel.materials);
  sqlParams.input("Todo", TYPES.NVarChar, requestModel.toDo);
  setAgendas(sqlParams, requestModel.agendas);
}
const service = new PlanService();
module.exports = service;
