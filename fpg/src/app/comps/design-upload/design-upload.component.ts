import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { DesignImageUploadPack } from '../../shared/Datatypes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';

@Component({
  selector: 'app-design-upload',
  templateUrl: './design-upload.component.html',
  styleUrls: ['./design-upload.component.css']
})
export class DesignUploadComponent implements OnInit {

  @Output()onDesignSelectionComplete:EventEmitter<DesignImageUploadPack> = new EventEmitter();

  public MAIN_IMAGE_SELECTED = false;
  public THUMB_IMAGE_SELECTED = false;
  public preloadingClass='';
  public frMain:FileReader;
  public frThumb:FileReader;
  public srcM='';
  public srcT='';
  public quality_main = 70;
  public quality_thumbnail = 90;
  private uploadPack:DesignImageUploadPack = {uploadedMainImageSource:'',uploadedThumbImageSource:''};
  private Notice:string ='';


  constructor(private http:HttpClient,private fbps:FireBasePropertiesService) { 
    this.frMain = new FileReader();
    this.frThumb = new FileReader();

    this.frMain.onload = (e:any)=>{
      this.srcM = e.target.result;
      this.MAIN_IMAGE_SELECTED = true;
    }

    this.frThumb.onload = (e:any)=>{
      this.srcT = e.target.result;
      this.THUMB_IMAGE_SELECTED = true;
    }
    

  }

  goForNext(){

    var formdata = new FormData();
    var mainImageFileInput:HTMLInputElement =   <HTMLInputElement>document.getElementById('main_image_file_input');
    var thumbImageFileInput:HTMLInputElement =   <HTMLInputElement>document.getElementById('thumb_image_file_input');

    formdata.append('quality_main',''+this.quality_main);
    formdata.append('quality_thumbnail',''+this.quality_thumbnail);
    formdata.append('designs[]',mainImageFileInput.files[0]);
    formdata.append('designs[]',thumbImageFileInput.files[0]);
    formdata.append('auth-token',this.fbps.getPHPAuthToken());
    formdata.append('action','upload');

    this.http.post(this.fbps.getDesignRootFolder()+'feed.php',formdata).subscribe((data:any)=>{
      this.Notice = data.status.description;
      if(data.status.description.indexOf('uploaded!')>-1){
        this.uploadPack.uploadedMainImageSource = this.fbps.getDesignRootFolder()+data.data.main;
        this.uploadPack.uploadedThumbImageSource = this.fbps.getDesignRootFolder()+data.data.thumbnail;
        this.onDesignSelectionComplete.emit(this.uploadPack);
      }

    })

    
  }

  public cleanUp(type:string){
    if(type==='main'){
      this.srcM = "";
      this.MAIN_IMAGE_SELECTED = false;
    }
    if(type==='thumb'){
       this.srcT = "";
       this.THUMB_IMAGE_SELECTED = false;
    }
  }

  public openFileSelector(id:string){

    var divinput = document.getElementById(id);
    var event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
    });

    divinput.dispatchEvent(event);

  }

  onImageSelect(inputID:string,type:string){

    var fileInput:HTMLInputElement = <HTMLInputElement>document.getElementById(inputID);
    
    if(type==='main'){

      if(fileInput.files[0]){
        this.frMain.readAsDataURL(fileInput.files[0]);
      }
      

    }

    if(type==='thumb'){

      if(fileInput.files[0]){
        this.frThumb.readAsDataURL(fileInput.files[0]);
      }
      

    }
    

  }

  ngOnInit() {

  }

}
