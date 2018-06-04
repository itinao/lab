// @flow

import firebase from 'firebase/app';
import 'firebase/messaging';
import credentials from './../credentials'

import request from './request';

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(credentials);
    }
  }

  initializeMessaging() {
    try {
      const messaging = firebase.messaging();
      messaging.useServiceWorker(reg);
      messaging.requestPermission().then(() => {
        console.log('Notification permission granted.');
        messaging.getToken().then((currentToken) => {
          messaging.onMessage((payload) => {
            console.log("Message received. ", payload)
          })
          request.tokenRegister(currentToken, () => {
            console.log("finished request.tokenRegister");
          }, () => {});
          console.log(currentToken);
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err)
        });
      }).catch((err) => {
        console.log('Unable to get permission to notify.', err)
      });

      messaging.onTokenRefresh(() => {
        messaging.getToken().then((refreshedToken) => {
          request.tokenRegister(refreshedToken, () => {
            console.log("finished request.tokenRegister");
          }, () => {});
          console.log('Token refreshed: ' + refreshedToken)
        }).catch((err) => {
          console.log('Unable to retrieve refreshed token ', err)
        })
      });
    } catch(err) {
      console.error('FirebaseMessaging error: ', err);
    };
  }
}

export default Firebase;
