import { logger } from 'firebase-functions';
import { sendinblueApiKey } from './config/config';

export const obfuscatedConfig = {
  sendinblueApiKey: '<omitted>',
};

export const complete = () => {
  logger.log('Completed execution of extension');
};

export const errorAddUser = (err: Error) => {
  logger.error('Error when adding user to Sendinblue list', err);
};

export const errorRemoveUser = (err: Error) => {
  logger.error('Error when removing user from Sendinblue list', err);
};

export const init = () => {
  logger.log('Initializing extension with configuration', obfuscatedConfig);
};

export const initError = (err: Error) => {
  logger.error('Error when initializing extension', err);
};

export const sendinblueNotInitialized = () => {
  logger.error(
    'Sendinblue was not initialized correctly, check for errors in the logs'
  );
};

export const start = () => {
  logger.log(
    'Started execution of extension with configuration',
    obfuscatedConfig
  );
};

export const userAdded = (userId: string, listId: string, result: string) => {
  logger.log(`Added user: ${userId} to Sendinblue list(s): ${listId}`);
  logger.log(result);
};

export const userAdding = (userId: string, listId: string) => {
  logger.log(`Adding user: ${userId} to Sendinblue list: ${listId}`);
};

export const userNoEmail = () => {
  logger.log('User does not have an email');
};

export const noListIds = () => {
  logger.log('No configuration for SENDINBLUE_LIST_IDS');
};

export const userRemoved = (userId: string, email: string) => {
  logger.log(`Removed user: ${userId} with hashed email: ${email}`);
};

export const userRemoving = (userId: string, email: string) => {
  logger.log(`Removing user: ${userId} with hashed email: ${email}`);
};
