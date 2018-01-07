import { Component, OnInit } from '@angular/core';
import { DesignItem , ValidMappedDesignInage} from '../../shared/Datatypes';
import { Location } from '@angular/common';
import {FormControl} from '@angular/forms'
import { Router  } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';

@Component({
  selector: 'app-garbage-clean-up',
  templateUrl: './garbage-clean-up.component.html',
  styleUrls: ['./garbage-clean-up.component.css']
})
export class GarbageCleanUpComponent implements OnInit {
  public firebase:FireBase;
  private ListOfDesignImages:Array<string>=[];
  private ListOfDesign:Array<any>=[];
  private FireBaseDataREF:any = [];

  public resultList:Array<ValidMappedDesignInage>=[];
  

  constructor(private fbps:FireBasePropertiesService,private http:HttpClient) { 
    
    var base = this;    
    base.firebase = fbps.getInstanceOfFireBase();
    if(this.firebase.database()){
      base.FireBaseDataREF = this.firebase.database().ref(this.fbps.getRefString(1)+'/data');
    }
   if(base.FireBaseDataREF){
    if(base.FireBaseDataREF.once){ 
    base.FireBaseDataREF.once('value').then((snapShot)=>{
    
    this.ListOfDesign = (()=>{
        var arr=[];
        Object.keys(snapShot.val()).forEach(function(key){
            var obj = snapShot.val()[key];
            obj['id'] = key;
            arr.push(obj);
        })
        return arr;
    })();

    
    this.getUpdatedListOfPhysicalImages();
    });
    }
   }
  }

  prepareList(){

    this.resultList = [];
    this.ListOfDesignImages.forEach((path)=>{

          this.resultList.push({
            main:this.fbps.getAbsPathFromFname(path,'m'),
            thumbnail:this.fbps.getAbsPathFromFname(path,'s'),
            mapped:false,
            mappedWith:'',
            onlyImagePath:path
          });

    });
    
    this.ListOfDesign.forEach((obj,n)=>{
       var t = this.ListOfDesignImages.indexOf(this.fbps.getFnameFromAbsPath(obj.file)); 
       this.resultList[t].mapped = true;
       this.resultList[t].mappedWith = obj.id;
    });
    
  }

  getUpdatedListOfPhysicalImages(){
    var formdata = new FormData();
    formdata.append('auth-token',this.fbps.getPHPAuthToken());
    formdata.append('action','list');
    this.http.post(this.fbps.getDesignRootFolder()+'feed.php',formdata).subscribe((statusObject:any)=>{
      this.ListOfDesignImages=[];
      statusObject.data.forEach((p)=>{
        if(p!=='.' && p!=='..'){
          this.ListOfDesignImages.push(p);
        }
      })
      
      this.prepareList();
    });
  }

  simpleDelete(path:string,action:string){
      var formdata = new FormData();
      
      formdata.append('auth-token',this.fbps.getPHPAuthToken());
      formdata.append('action',action);
      formdata.append('filename',path);

      this.http.post(this.fbps.getDesignRootFolder()+'feed.php',formdata).subscribe((statusDataFirst)=>{
               console.log(statusDataFirst);
               this.getUpdatedListOfPhysicalImages();
      });

  }

  
  ngOnInit() {
     

  }

}
