import * as functions from 'firebase-functions';

const SibApiV3Sdk = require('sib-api-v3-typescript');

import { sendinblueApiKey, sendinblueListIds } from '../config/config';
import * as logs from '../logs';

logs.init();
let apiInstance = new SibApiV3Sdk.ContactsApi();

try {
  let apiKey = apiInstance.authentications['apiKey'];
  if (!sendinblueApiKey) {
    logs.sendinblueNotInitialized();
  } else {
    apiKey.apiKey = sendinblueApiKey;
  }
} catch (err) {
  logs.initError(err);
}

export const addUserToList = functions.handler.auth.user.onCreate(
  async (user): Promise<void> => {
    logs.start();
    if (!apiInstance) {
      logs.sendinblueNotInitialized();
      return;
    }
    const { email, uid } = user;

    if (!email) {
      logs.userNoEmail();
      return;
    }

    if (!sendinblueListIds) {
      logs.noListIds();
      return;
    }

    try {
      logs.userAdding(uid, sendinblueListIds);

      let createContact = new SibApiV3Sdk.CreateContact();
      createContact.email = email;
      createContact.listIds = sendinblueListIds.split(',');

      const results = await apiInstance.createContact(createContact);
      logs.userAdded(uid, sendinblueListIds, JSON.stringify(results));
      logs.complete();
    } catch (err) {
      logs.errorAddUser(err);
    }
  }
);

export const removeUserFromList = functions.handler.auth.user.onDelete(
  async (user): Promise<void> => {
    logs.start();

    if (!apiInstance) {
      logs.sendinblueNotInitialized();
      return;
    }

    const { email, uid } = user;
    if (!email) {
      logs.userNoEmail();
      return;
    }

    try {
      logs.userRemoving(uid, email);
      await apiInstance.deleteContact(email);
      logs.userRemoved(uid, email);
      logs.complete();
    } catch (err) {
      logs.errorRemoveUser(err);
    }
  }
);
