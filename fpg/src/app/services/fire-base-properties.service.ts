import { Injectable } from '@angular/core';

@Injectable()
export class FireBasePropertiesService {

  private REF:any;

  constructor() {
    this.REF = {
      personal:'DESIGN_HUB_TEST_2009D04D02',
      corporate:'DESIGN_HUB_TEST_2017D04D02',
    }
   }

  getInstanceOfFireBase():FireBase{
    var fb:FireBase = window['firebase'];
    return fb;
  }

  getRefString(type:number):string{
    if(type){
      return this.REF.personal;
    }
    return this.REF.corporate;
  }

  getFireBaseConfig():FireBaseConfig{
    /*
    return {
     apiKey: "AIzaSyANXuh2hOm1sU4rQIgvuEC3kUDJtbc6KO4",
     authDomain: "designhub-12489.firebaseapp.com",
     databaseURL: "https://designhub-12489.firebaseio.com",
     projectId: "designhub-12489",
     storageBucket: "designhub-12489.appspot.com",
     messagingSenderId: "914292655938"
    }; */

    return {
      apiKey: "AIzaSyC2HJgfur3W8U6x_CSG_R7k2i6cvXGHe_8",
      authDomain: "designtest-b2a4b.firebaseapp.com",
      databaseURL: "https://designtest-b2a4b.firebaseio.com",
      projectId: "designtest-b2a4b",
      storageBucket: "designtest-b2a4b.appspot.com",
      messagingSenderId: "872922559440"
    };

  }

}