import { AZURE_STORAGE_KEY, AZURE_STORAGE_ACCOUNT } from './settings';
import azure from 'azure-storage';

const TABLE_NAME = 'FilteredShouts';
const tableService = azure.createTableService(
  AZURE_STORAGE_ACCOUNT,
  AZURE_STORAGE_KEY
);

/**
 * Gets the filtered shout from storage
 * @param {string} shoutId
 * @return {Promise}
 */
function getByShoutId(shoutId) {
  const { TableQuery, TableUtilities } = azure;

  const query = new TableQuery().where(
    TableQuery.stringFilter(
      'ShoutId',
      TableUtilities.QueryComparisons.EQUAL,
      shoutId
    )
  );

  const promise = new Promise((resolve, reject) => {
    const callback = (error, result) => {
      if (error) reject(error);
      resolve(result.entries);
    };

    tableService.queryEntities(TABLE_NAME, query, null, callback);
  });

  return promise;
}

/**
 * Saves shout into storage
 * @param {object} shoutEntity
 * @return {Promise}
 */
const insertShout = (shoutEntity) =>
  new Promise((resolve, reject) => {
    const callback = (error) => {
      if (error) reject(error);
      resolve();
    };

    tableService.insertEntity(TABLE_NAME, shoutEntity, callback);
  });

/**
 * Retrieves the top pageSize shouts
 * @param {object} continuationToken Table storage token to allow pagination.
 * @param {number} pageSize Number of records to retrieve.
 * @return {Promise} Promise with entries and continuation token.
 */
const getLatestShouts = (continuationToken, pageSize) => {
  const { TableQuery } = azure;

  const query = new TableQuery().top(pageSize);

  const promise = new Promise((resolve, reject) => {
    const callback = (error, result) => {
      if (error) reject(error);
      resolve(result);
    };

    tableService.queryEntities(TABLE_NAME, query, continuationToken, callback);
  });

  return promise;
};

export { getByShoutId, insertShout, getLatestShouts };
