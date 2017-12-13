import { Component, OnInit, OnChanges, Input,Output, ViewChild ,ElementRef , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-image-color-picker',
  templateUrl: './image-color-picker.component.html',
  styleUrls: ['./image-color-picker.component.css']
})
export class ImageColorPickerComponent implements OnInit,OnChanges {

  @Input() physicalImagePath:string = "";
  @Output() onColorPicked:EventEmitter<Array<string>> = new EventEmitter();
  @ViewChild('colorPickerCanvas') canvasElRef:ElementRef;
  public positionStr:string = "";
  private canvas:HTMLCanvasElement;
  public moveStyleObj={top:'0px',left:'0px',moveOffset:15};
  public selectedColorList = [];

  constructor() {
    document.body.classList.add('body-should-not-move');
   }

   private loadImageAndSetCanvas(callback:Function){
     let imgEL:HTMLImageElement = document.createElement('img');
     imgEL.crossOrigin = "Anonymous";
     imgEL.onload = ()=>{
       let ctx;
       this.canvas.width = imgEL.width;
       this.canvas.height = imgEL.height;
       ctx = this.canvas.getContext('2d');
       ctx.drawImage(imgEL,0,0,imgEL.width,imgEL.height);
       //console.log(this.canvas.toDataURL("image/jpg"));
      //localStorage.setItem('savedImage',this.canvas.toDataURL("image/jpg"));
     }

     imgEL.onerror = (err)=>{
       alert('Cross origin image is not allowed here.');
     };

     if(this.physicalImagePath!==null){
       imgEL.setAttribute('src',this.physicalImagePath);
     }     
   }

   componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
   }

   rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

   public pickPixel(e:MouseEvent){
     let ctx = this.canvas.getContext('2d');
     let p = ctx.getImageData(e.pageX,e.pageY,1,1).data;
     var hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6);
     if(this.selectedColorList.indexOf(hex)==-1){
       this.selectedColorList.push(hex);
     }
     console.log(hex);
   }

   removeColorFormList(clr:string){
     let clrindex = this.selectedColorList.indexOf(clr);
     let updatedarr = this.selectedColorList.splice(clrindex,1);
     console.log(this.selectedColorList);
     console.log(updatedarr);
   }

   jobDone(signal:boolean){
     if(signal){
       this.onColorPicked.emit(this.selectedColorList);
     }else{
       this.selectedColorList = [];
       this.onColorPicked.emit(this.selectedColorList);
     }
     
     document.body.classList.remove('body-should-not-move');
   }

   public pickPixelMove(e:MouseEvent){
     this.positionStr = ""+e.pageX;
     let lVal = e.pageX+10,tVal = e.pageY+this.moveStyleObj.moveOffset;

     this.moveStyleObj.left = lVal+'px';
     this.moveStyleObj.top = tVal+'px';
   }
  
  ngOnChanges(){
    this.loadImageAndSetCanvas(()=>{
    });    
  }

  ngOnInit() {
    this.canvas = this.canvasElRef.nativeElement;
   /* this.canvas.addEventListener('mousemove',(e:MouseEvent)=>{
      this.positionStr = ""+e.pageX;
    });*/

  }

}
