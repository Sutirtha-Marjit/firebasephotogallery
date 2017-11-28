/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare var firebase: FireBase;

interface FireBase{  
    __esModule: boolean,
    initializeApp: Function,
    app: Function,
    apps: Array<any>,
    Promise: Function,
    SDK_VERSION: string,
    INTERNAL: any,
    default: any,
    auth: Function,
    User: Function,
    database: Function,
    messaging: Function,
    storage: Function,

}
declare var firebaseconfig: FireBaseConfig;

interface FireBaseConfig{
  apiKey:string,
  authDomain:string,
  databaseURL:string,
  projectId:string,
  storageBucket:string,
  messagingSenderId:string
}
