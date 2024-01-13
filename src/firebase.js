import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBQsbdxNI_SzRe_UcPETFTCLE1Dl00Dtws",
  authDomain: "albion-9bab2.firebaseapp.com",
  projectId: "albion-9bab2",
  storageBucket: "albion-9bab2.appspot.com",
  messagingSenderId: "1080007356916",
  appId: "1:1080007356916:web:be6cf4dcc44ac2dbf189a1",
  measurementId: "G-ZG1N8DJ6KV",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    return window.navigator.serviceWorker
      .getRegistration("/albion_web/")
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register(
          "/albion_web/firebase-messaging-sw.js",
          {
            scope: "/albion_web/",
          }
        );
      });
  }
  throw new Error("The browser doesn`t support service worker.");
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker().then((serviceWorkerRegistration) =>
    getToken(messaging, {
      vapidKey:
        "BD3ohwBToIePL8R4Y5xiNGEbT5_K7945bfHOKp-qpFPw4EJd8Xsy1PS_PI_wQyFgsG2Nwr7ljICVw4ASClssO4E",
      serviceWorkerRegistration,
    })
  );

export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
