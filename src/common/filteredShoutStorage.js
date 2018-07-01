const { AZURE_STORAGE_KEY, AZURE_STORAGE_ACCOUNT } = require('./settings');
const TABLE_NAME = 'FilteredShouts';

const azure = require('azure-storage');
const tableService = azure.createTableService(
  AZURE_STORAGE_ACCOUNT, 
  AZURE_STORAGE_KEY
);

function getByRowKey(rowKey) {
  const { TableQuery, TableUtilities } = azure;

  const query = new TableQuery().where(
    TableQuery.stringFilter(
      'RowKey', 
      TableUtilities.QueryComparisons.EQUAL, 
      rowKey));

  const promise = new Promise((resolve, reject) => {
    const callback = (error, result) => {
      if (error) reject(error);
      resolve(result.entries);
    };

    tableService.queryEntities(TABLE_NAME, query, null, callback);
  });

  return promise;
}

module.exports = {
  getByRowKey
};