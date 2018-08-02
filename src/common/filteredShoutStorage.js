import { AZURE_STORAGE_KEY, AZURE_STORAGE_ACCOUNT } from './settings';
import azure from 'azure-storage';

const TABLE_NAME = 'FilteredShouts';
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

const insertShout = (shoutEntity) => new Promise((resolve, reject) => {
  const callback = (error) => {
    if (error) reject(error);
    resolve();
  };

  tableService.insertEntity(TABLE_NAME, shoutEntity, callback);
});

export {
  getByRowKey,
  insertShout
};