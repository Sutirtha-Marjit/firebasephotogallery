import { Component, OnInit , OnChanges, Output, Input, EventEmitter} from '@angular/core';
import { DesignImageUploadPack ,SizePass, DesignItem, DesignUpdatePatterns} from '../../shared/Datatypes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';

@Component({
  selector: 'app-design-upload',
  templateUrl: './design-upload.component.html',
  styleUrls: ['./design-upload.component.css']
})
export class DesignUploadComponent implements OnInit,OnChanges {

  @Output()onDesignSelectionComplete:EventEmitter<DesignImageUploadPack> = new EventEmitter();
  @Input()designItemToUpDate:DesignItem = null;
  @Input()UPDATE_MODE:boolean;

  public MAIN_IMAGE_SELECTED = false;
  public THUMB_IMAGE_SELECTED = false;
  public ALREADY_UPLOADED_IMAGE_IN_USE_MAIN = false;
  public ALREADY_UPLOADED_IMAGE_IN_USE_THUMB = false;
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

  private normalSubmission(){
      var formdata = new FormData();
    var mainImageFileInput:HTMLInputElement =   <HTMLInputElement>document.getElementById('main_image_file_input');
    var thumbImageFileInput:HTMLInputElement =   <HTMLInputElement>document.getElementById('thumb_image_file_input');
    this.preloadingClass = "preloading";
    formdata.append('quality_main',''+this.quality_main);
    formdata.append('quality_thumbnail',''+this.quality_thumbnail);
    formdata.append('designs[]',mainImageFileInput.files[0]);
    formdata.append('designs[]',thumbImageFileInput.files[0]);
    formdata.append('auth-token',this.fbps.getPHPAuthToken());
    formdata.append('action','upload');

    this.http.post(this.fbps.getDesignRootFolder()+'feed.php',formdata).subscribe((data:any)=>{
      this.preloadingClass = "";
      this.Notice = data.status.description;
      if(data.status.description.indexOf('uploaded!')>-1){
        this.uploadPack.uploadedMainImageSource = this.fbps.getDesignRootFolder()+data.data.main;
        this.uploadPack.uploadedThumbImageSource = this.fbps.getDesignRootFolder()+data.data.thumbnail;
        this.onDesignSelectionComplete.emit(this.uploadPack);
      }

    })
  }

  simpleDelete(path:string,action:string,callback:Function){
      var formdata = new FormData();
      formdata.append('auth-token',this.fbps.getPHPAuthToken());
      formdata.append('action',action);
      formdata.append('filename',path);

      this.http.post(this.fbps.getDesignRootFolder()+'feed.php',formdata).subscribe((statusDataFirst)=>{
          callback(statusDataFirst);       
      });

  }

  updateDesigns(){
    var formdata = new FormData(),tPath=this.designItemToUpDate.file.replace('main','small'),pattern='';
    var mainImageFileInput:HTMLInputElement =   <HTMLInputElement>document.getElementById('main_image_file_input');
    var thumbImageFileInput:HTMLInputElement =   <HTMLInputElement>document.getElementById('thumb_image_file_input');

    if(this.srcM === this.designItemToUpDate.file && this.srcT === tPath){
      if(confirm('So you are not going to change any of the design images... right?')){
        this.uploadPack.uploadedMainImageSource = this.srcM;
        this.uploadPack.uploadedThumbImageSource = this.srcT;
        this.onDesignSelectionComplete.emit(this.uploadPack);
      }
    }else{
      if(this.srcM !== this.designItemToUpDate.file && this.srcT !== tPath){
          pattern = this.fbps.getUpdatePatterns().MAIN_AND_THUMB; 
          formdata.append('maindesign',mainImageFileInput.files[0]); 
          formdata.append('thumbdesign',thumbImageFileInput.files[0]); 
                   
      }
      if(this.srcM === this.designItemToUpDate.file && this.srcT !== tPath){
        pattern = this.fbps.getUpdatePatterns().THUMBNAIL_ONLY;
        formdata.append('thumbdesign',thumbImageFileInput.files[0]);
      }
      if(this.srcM !== this.designItemToUpDate.file && this.srcT === tPath){
        pattern = this.fbps.getUpdatePatterns().MAIN_ONLY;  
        formdata.append('maindesign',mainImageFileInput.files[0]);       
      }
    }
    
    formdata.append('auth-token',this.fbps.getPHPAuthToken());
    formdata.append('action','UPDATE_DESIGNS');
    formdata.append('quality_main',''+this.quality_main);
    formdata.append('quality_thumbnail',''+this.quality_thumbnail);
    formdata.append('pattern',pattern); 
    formdata.append('old',this.designItemToUpDate.file);
    
    this.preloadingClass = "preloading";
    this.http.post(this.fbps.getDesignRootFolder()+'feed.php',formdata).subscribe((statusDataFirst)=>{
          console.dir(statusDataFirst);  
          this.preloadingClass = "";     
          this.uploadPack.uploadedMainImageSource = this.designItemToUpDate.file;
          this.uploadPack.uploadedThumbImageSource = tPath;
          this.onDesignSelectionComplete.emit(this.uploadPack);
    });

  }

  goForNext(){

      if(this.preloadingClass.length==0){
          if(this.UPDATE_MODE){
                this.updateDesigns();
               
              }else{
                console.log('normalSubmission');
                this.normalSubmission();
              }
      }
    
  }

  public cleanUp(type:string){
    if(type==='main'){
      this.srcM = "";
      this.MAIN_IMAGE_SELECTED = false;
      this.ALREADY_UPLOADED_IMAGE_IN_USE_MAIN = false;
      
    }
    if(type==='thumb'){
       this.srcT = "";
       this.THUMB_IMAGE_SELECTED = false;
       this.ALREADY_UPLOADED_IMAGE_IN_USE_THUMB = false;
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
    var sizePass:SizePass;
    if(type==='main'){

      if(fileInput.files[0]){
        sizePass = this.fbps.getSizePass(fileInput.files[0]);
        if(sizePass.status){
          this.frMain.readAsDataURL(fileInput.files[0]);
        }else{
          let sz = sizePass.size.toFixed(2);
          var choice = confirm('Please optimize your image file.\n It crossed the limit of '+sizePass.limit+'MB. Size of your file is '+sizePass.size+'MB.\nGo with it?');
          if(choice){
            this.frMain.readAsDataURL(fileInput.files[0]);
          }
        }
      }

    }

    if(type==='thumb'){

      if(fileInput.files[0]){
        sizePass = this.fbps.getSizePass(fileInput.files[0]);
        if(sizePass.status){
        this.frThumb.readAsDataURL(fileInput.files[0]);
        }else{
          let sz = sizePass.size.toFixed(2);
          this.fbps.showAlert('Please optimize your image file. It crossed the limit of '+sizePass.limit+'MB. Size of your file is '+sizePass.size+'MB');
        }
      }
      

    }
    

  }

 

  ngOnChanges(){
    /*console.log('ngOnChanges');
    console.log('UPLOAD WINDOW');
    console.dir(this.UPDATE_MODE);
    console.dir(this.designItemToUpDate);
    console.log('.................................');*/
    if(this.UPDATE_MODE){
      this.srcM = this.designItemToUpDate.file;
      this.srcT = this.designItemToUpDate.file.replace('main','small');
      this.MAIN_IMAGE_SELECTED = true;
      this.THUMB_IMAGE_SELECTED = true; 
      this.ALREADY_UPLOADED_IMAGE_IN_USE_THUMB = true;   
      this.ALREADY_UPLOADED_IMAGE_IN_USE_MAIN = true;   
    }
  }

  ngOnInit() {
    
  }

}
