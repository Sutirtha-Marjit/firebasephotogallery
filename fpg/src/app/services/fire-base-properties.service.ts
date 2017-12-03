import { Injectable } from '@angular/core';
import { SizePass, DesignItem, DesignUpdatePatterns } from '../shared/Datatypes';

@Injectable()
export class FireBasePropertiesService {

  private REF:any;

  constructor() {
    this.REF = {
      personal:'DESIGN_HUB_TEST_2009D04D02',
      corporate:'DESIGN_HUB_TEST_2017D04D02',
    }
   }
   
   

   showAlert(msg){
     alert(msg);
   }

   getUpdatePatterns():DesignUpdatePatterns{
     return {
       MAIN_ONLY:'M',
       THUMBNAIL_ONLY:'T',
       MAIN_AND_THUMB:'MT'
     }
   }

   getABlankDesignItem():DesignItem{
      return {
        heading:'Some heading',
        description:'Some description',
        notes:'Notes for my design',
        tags:[],
        colors:[],
        grade:10,
        file:'',
        date:new Date(),
        type:''
      }
   }

   getFnameFromAbsPath(absPath:string):string{

     var arr = absPath.split('/');
     return arr[arr.length-1];

   }

   getAbsPathFromFname(fname:string,type:string):string{

     if(type==='s'){
       return this.getDesignRootFolder()+'designs/small/'+fname;
     }else{
       return this.getDesignRootFolder()+'designs/main/'+fname;
     }

   }

  getSizePass(fileObject:any):SizePass{
    var crSize = (fileObject['size']/1024)/1024;

    var sizepass:SizePass = {
      size:crSize,
      status:false,
      limit:1
    };

    if(crSize>1){

      return sizepass;
    }
    sizepass.status = true;
    return sizepass;
  }

  getInstanceOfFireBase():FireBase{
    var fb:FireBase = window['firebase'];
    return fb;
  }

  getDesignRootFolder():string{
    //return 'http://localhost/gallery/';
    return window['DESIGN_ROOT_FOLDER'] || 'http://localhost/gallery/';    
  }

  getCacheClearingRandomNumber():string{    
    return  (new Date()).getTime()+'tx'+((Math.random()+'').replace('0.','_'));
  }

  getPHPAuthToken():string{
    return '878787';
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
