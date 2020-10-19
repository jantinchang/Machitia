const debug = require("sabio-debug");
const { dataProvider, TYPES } = require("sabio-data");
const _logger = debug.extend("console");
const Paged = require("sabio-models").Paged;

class FileUploadService{

    getAll(pageIndex, pageSize){
        return new Promise(executer);
        
        function executer(resolve, reject){
          let file = null;
          let page = null;
          let totalCount = 0;
          const procName = "dbo.Files_SelectAll";
          const returnParamMapper = null;
    
          dataProvider.executeCmd(
            procName,
            inputParamMapper,
            singleRecordMapper,
            returnParamMapper,
            onCompleted
          );
          function inputParamMapper(sqlParams){
            sqlParams.input("PageIndex", TYPES.Int, pageIndex);
            sqlParams.input("PageSize", TYPES.Int, pageSize);
          }
          function singleRecordMapper(data, set){   
            if(!file){
              file = [];
            } totalCount = data.totalCount;
            delete data.totalCount;
            file.push(data);
          }    
          function onCompleted(err, data){
            if(err){
              reject(err)
              return;
            }
            if(file){
              page = new Paged(file, pageIndex, pageSize, totalCount)
            }
            resolve(page)
          }
        }
    }

    getById(id){
        return new Promise(executer);
    
        function executer(resolve, reject){
          let file = null;
          const procName = "dbo.Files_SelectById";
          const returnParamMapper = null;
    
          dataProvider.executeCmd(
            procName,
            inputParamMapper,
            singleRecordMapper,
            returnParamMapper,
            onCompleted
          );
    
          function inputParamMapper(sqlParams){
            sqlParams.input("Id", TYPES.Int, id)
          }
    
          function singleRecordMapper(data, set){
            file = data;
          }
    
          function onCompleted(err, data){
            if(err){
              reject(err)
              return;
            }

            resolve(file);
          }
        }
    }

    getByCreatedBy(createdBy, pageindex, pageSize){
        return new Promise(executer);
    
        function executer(resolve, reject){
          let file = null;
          let page = null;
          let totalCount = 0;
          const procName = "dbo.Files_SelectByCreatedBy";
          const returnParamMapper = null;
    
          dataProvider.executeCmd(
            procName,
            inputParamMapper,
            singleRecordMapper,
            returnParamMapper,
            onCompleted
          );    
          function inputParamMapper(sqlParams){
            sqlParams.input("CreatedBy", TYPES.Int, createdBy);
            sqlParams.input("PageIndex", TYPES.Int, pageindex);
            sqlParams.input("PageSize", TYPES.Int, pageSize);
          }    
          function singleRecordMapper(data, set){
            if (!file) {
              file = [];
            } totalCount = data.totalCount;
            delete data.totalCount;
            file.push(data);
          }    
          function onCompleted(err, data){
            if (err) {
              reject(err);
              return;
            }
            if(file){
              page = new Paged(file, pageIndex, pageSize, totalCount)
            }
            resolve(page);
          }
        }
    }

    add(url, fileType, userId){
        return new Promise(executor);
    
        function executor(resolve, reject){
          const procName = "dbo.Files_Insert";
          let fileId = null;
          dataProvider.executeNonQuery(
            procName,
            inputParamMapper,
            returnParamMapper,
            onCompleted
          );
    
          function inputParamMapper(sqlParams){
            sqlParams.input("Url", TYPES.VarChar, url);
            sqlParams.input("FileTypeId", TYPES.VarChar, fileType);

            sqlParams.input("CreatedBy", TYPES.Int, userId);

            sqlParams.output("Id", TYPES.Int);
          }
    
          function returnParamMapper(returnParams){
            _logger(returnParams);
    
            if(returnParams){
                fileId = returnParams.id;
            }
          }
    
          function onCompleted(err, data){
            if(err){
              reject(err)
              return;
            }

            resolve(fileId);
          }
        }
    }

    update(id, url, fileType, userId){
        return new Promise(executor);
    
        function executor(resolve, reject){
    
          const procName = "dbo.Files_Update";
    
          const returnParamMapper = null;
    
          dataProvider.executeNonQuery(
            procName,
            inputParamMapper,
            returnParamMapper,
            onCompleted
          );
    
          function inputParamMapper(sqlParams){
            sqlParams.input("Url", TYPES.VarChar, url);
            sqlParams.input("FileTypeId", TYPES.VarChar, fileType);

            sqlParams.input("CreatedBy", TYPES.Int, userId);

            sqlParams.input("Id", TYPES.Int, id);
          }
    
          function onCompleted(err, data){
            if(err){
              reject(err)
              return;
            }
    
            resolve();
          }
        }
    }
    
    delete(id){
      return new Promise(executor);
  
      function executor(resolve, reject){
  
        const procName = "dbo.Files_DeleteById";
  
        const returnParamMapper = null;
  
        dataProvider.executeNonQuery(
          procName,
          inputParamMapper,
          returnParamMapper,
          onCompleted
        );
  
        function inputParamMapper(sqlParams){
          sqlParams.input("Id", TYPES.Int, id)
        }
  
        function onCompleted(err, data){
          if(err){
            reject(err)
            return;
          }
  
          resolve();
        }
      }
    }

}
  
const service = new FileUploadService();
  
module.exports = service;