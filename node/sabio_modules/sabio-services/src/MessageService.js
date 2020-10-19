const { dataProvider, TYPES } = require("sabio-data");
const Paged = require("sabio-models").Paged;

class MessageService {
    deleteById(id) {
        return new Promise(executor);
        function executor(resolve, reject) {
            const procName = "dbo.Messages_DeleteById"
            const returnParamMapper = null;
            dataProvider.executeNonQuery(procName, inputParamMapper, returnParamMapper, onCompleted);
            function inputParamMapper(sqlParams) {
                sqlParams.input("Id", TYPES.Int, id);
            }
            function onCompleted(err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            }
        }
    }
    update(model, id, userId) {
        return new Promise(executor);
        function executor(resolve, reject) {
            const procName = "dbo.Messages_Update"
            const returnParamMapper = null;
            dataProvider.executeNonQuery(procName, inputParamMapper, returnParamMapper, onCompleted);
            function inputParamMapper(sqlParams) {
                inputCommonParams(sqlParams, model, userId);
                sqlParams.input("Id", TYPES.Int, id);
            }
            function onCompleted(err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            }
        }
    }
    add(model, userId) {
        return new Promise(executor);
        function executor(resolve, reject) {
            const procName = "dbo.Messages_Insert"
            let messageCreated = null;
            dataProvider.executeNonQuery(procName, inputParamMapper, returnParamMapper, onCompleted);
            function inputParamMapper(sqlParams) {
                inputCommonParams(sqlParams, model, userId);
                sqlParams.output("Id", TYPES.Int);
            }
            function returnParamMapper(sqlParameters) {
                messageCreated = sqlParameters.id;
            }
            function onCompleted(err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(messageCreated);
            }
        }
    }
    getById(id) {
        return new Promise(executor);
        function executor(resolve, reject) {
            let message = null;
            const procName = "dbo.Messages_SelectById";
            const returnParamMapper = null;
            dataProvider.executeCmd(procName, inputParamMapper, singleRecordMapper, returnParamMapper, onCompleted);

            function inputParamMapper(sqlParams) {
                sqlParams.input("Id", TYPES.Int, id);
            }
            function singleRecordMapper(data, set) {
                message = data;
            }
            function onCompleted(err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(message);
            }
        }
    }
    getAll(pageSize, pageIndex) {
        return new Promise(executor);
        function executor(resolve, reject) {
            let messages = null;
            const procName = "dbo.Messages_SelectAll";
            const returnParamMapper = null;
            dataProvider.executeCmd(procName, inputParamMapper, singleRecordMapper, returnParamMapper, onCompleted);
            function inputParamMapper(sqlParams) {
                sqlParams.input("PageIndex", TYPES.Int, pageIndex);
                sqlParams.input("PageSize", TYPES.Int, pageSize);
            }
            function singleRecordMapper(data, set) {
                if (!messages) {
                    messages = [];
                }
                messages.push(data);
            }
            function onCompleted(err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(messages);
            }
        }
    }
    getByCreatedBy(pageIndex, pageSize, createdBy) {
        return new Promise(executor);
        function executor(resolve, reject) {
            let list = null;
            let page = null;
            let totalCount = 0;
            const procName = "dbo.Messages_SelectByCreatedBy";
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
                sqlParams.input("SenderId", TYPES.Int, createdBy);
            }
            function singleRecordMapper(data, set) {
                if (!list) {
                    list = [];
                } totalCount = data.totalCount;
                delete data.totalCount;
                list.push(data);
            }
            function onCompleted(err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                if (list) {
                    page = new Paged(list, pageIndex, pageSize, totalCount);
                }
                resolve(page)
            }
        }
    }
    getByConversation(correspondentId, userId) {
        return new Promise(executor);
        function executor(resolve, reject) {
            let list = null;
            const procName = "dbo.Messages_SelectByConversation";
            const returnParamMapper = null;
            dataProvider.executeCmd(
                procName,
                inputParamMapper,
                singleRecordMapper,
                returnParamMapper,
                onCompleted
            );
            function inputParamMapper(sqlParams) {
                sqlParams.input("RecipientId", TYPES.Int, correspondentId);
                sqlParams.input("SenderId", TYPES.Int, userId);
            }
            function singleRecordMapper(data, set) {
                if (!list) {
                    list = [];
                }
                list.push(data);
            }
            function onCompleted(err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(list)
            }
        }
    }
    getCorrespondents(userId) {
        return new Promise(executor);
        function executor(resolve, reject) {
            let list = null;
            const procName = "dbo.Messages_SelectCorrespondents";
            const returnParamMapper = null;
            dataProvider.executeCmd(
                procName,
                inputParamMapper,
                singleRecordMapper,
                returnParamMapper,
                onCompleted
            );
            function inputParamMapper(sqlParams) {
                sqlParams.input("UserId", TYPES.Int, userId);
            }
            function singleRecordMapper(data, set) {
                if (!list) {
                    list = [];
                }
                list.push(data);
            }
            function onCompleted(err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(list)
            }
        }
    }
    searchCorrespondents(userId, query) {
        return new Promise(executor);
        function executor(resolve, reject) {
            let list = null;
            const procName = "dbo.Messages_SelectCorrespondentsSearch";
            const returnParamMapper = null;
            dataProvider.executeCmd(
                procName,
                inputParamMapper,
                singleRecordMapper,
                returnParamMapper,
                onCompleted
            );
            function inputParamMapper(sqlParams) {
                sqlParams.input("UserId", TYPES.Int, userId);
                sqlParams.input("Query", TYPES.VarChar, query);
            }
            function singleRecordMapper(data, set) {
                if (!list) {
                    list = [];
                }
                list.push(data);
            }
            function onCompleted(err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(list)
            }
        }
    }
    getByRecipientId(pageIndex, pageSize, recipientId) {
        return new Promise(executor);
        function executor(resolve, reject) {
            let list = null;
            let page = null;
            let totalCount = 0;
            const procName = "dbo.Messages_SelectByRecipientId";
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
                sqlParams.input("RecipientId", TYPES.Int, recipientId);
            }
            function singleRecordMapper(data, set) {
                if (!list) {
                    list = [];
                } totalCount = data.totalCount;
                delete data.totalCount;
                list.push(data);
            }
            function onCompleted(err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                if (list) {
                    page = new Paged(list, pageIndex, pageSize, totalCount);
                }
                resolve(page)
            }
        }
    }
}
function inputCommonParams(sqlParams, model, userId){
    sqlParams.input("Message", TYPES.VarChar, model.message)
    sqlParams.input("RecipientId", TYPES.VarChar, model.recipientId)
    sqlParams.input("SenderId", TYPES.VarChar, userId)
}
const service = new MessageService();
module.exports = service;