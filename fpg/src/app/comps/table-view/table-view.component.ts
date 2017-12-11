import { Component, OnInit, OnChanges } from '@angular/core';
import { DesignItem } from '../../shared/Datatypes';
import { Location } from '@angular/common';
import {FormControl} from '@angular/forms';
import { Router  } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit,OnChanges {

  public firebase:FireBase;
  public ListOfDesign:Array<any>=[];
  private FireBaseDataREF:any = null;
  public FireBaseDataLoaded:boolean = false;
  private router;
  public cacheClearingRandomNumber='T';
 
  constructor(private fbps:FireBasePropertiesService,_router:Router,_location:Location,private http:HttpClient) {
    var base = this;
    base.router = _router;
    base.firebase = fbps.getInstanceOfFireBase();
    base.FireBaseDataREF = this.firebase.database().ref(this.fbps.getRefString(1)+'/data');
    base.cacheClearingRandomNumber = this.fbps.getCacheClearingRandomNumber();
    base.FireBaseDataREF.once('value').then(function(snapShot){
      base.ListOfDesign = snapShot.val();
      base.FireBaseDataLoaded = true;
             
    });
   }

   ngOnChanges(){
     this.cacheClearingRandomNumber = this.fbps.getCacheClearingRandomNumber();
   }

   public removeDesign(id:string){
      if(confirm('Are you sure you want to delete this design')){
        var formdata = new FormData();
        var filename = (()=>{
                      var arr = this.ListOfDesign[id].file.split('/');
                      return arr[arr.length-1];
                    })();
        formdata.append('auth-token',this.fbps.getPHPAuthToken());
        formdata.append('action','remove');
        formdata.append('filename',filename);

        this.http.post(this.fbps.getDesignRootFolder()+'feed.php',formdata).subscribe((data)=>{
          this.FireBaseDataREF.child(id).remove();  
          
          window.location.hash = '#/table-view';
          window.location.reload(); 
        })
        //this.FireBaseDataREF.child(id).remove();      
      }      
  }
   

   openDetailPage(id){
    this.router.navigate(['/detail-view/'+id]); 
   }

   public getRowPackets():Array<any>{
      let pack=[];

      for(let el in this.ListOfDesign){
        this.ListOfDesign[el].id = el;
        this.ListOfDesign[el].thumb = this.ListOfDesign[el].file.replace('main','small');
        if(this.ListOfDesign[el].date){  
          let str="";
          let lcldate = new Date(parseInt(this.ListOfDesign[el].date));
          str += lcldate.getDate()+'.'+lcldate.getMonth()+'.'+lcldate.getFullYear()+' T '+lcldate.getHours()+':'+lcldate.getMinutes()+':'+lcldate.getSeconds()
          this.ListOfDesign[el].dateString = str;
          
        }        
        pack.push(this.ListOfDesign[el]);
      }
      
      pack.sort((a,b)=>{
        return (b.date - a.date);
      });
      
      return pack;
   }

  ngOnInit() {
  }

}
