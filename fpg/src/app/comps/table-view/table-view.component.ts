import { Component, OnInit, OnChanges } from '@angular/core';
import { DesignItem } from '../../shared/Datatypes';
import { Location } from '@angular/common';
import {FormControl} from '@angular/forms'
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
      var pack=[];

      for(var el in this.ListOfDesign){
        this.ListOfDesign[el].id = el;
        if(this.ListOfDesign[el].date){          
          this.ListOfDesign[el].dateString = new Date(this.ListOfDesign[el].date);
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
