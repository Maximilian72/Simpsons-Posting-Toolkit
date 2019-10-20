import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  canvasArray = [];
  canvasWidthArray = [];
  sourceArray = [];

  urlsIn: any;

  upperLower = "Add bottom text"
  lowerText = true;
  text = null;
  T1:string;
  T2:string;
  T3:string;
 
  constructor(private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state) {

        this.urlsIn = this.router.getCurrentNavigation().extras.state.urls;

      }

      let noURLs = this.urlsIn.urls.length;
      for(let i = 0; i < noURLs; i++){

        this.sourceArray[i] = this.urlsIn.urls[i];
        console.log(this.sourceArray[i]);

      }

    });

  }

  ionViewWillEnter(){
    this.makeAndOccupyCanvas();
  }
  
  makeAndOccupyCanvas(){

    let noMemes = this.sourceArray.length;
    for(let i = 0; i < noMemes; i++){

      let imgEl = "I" + i.toString();
      let canEl = "C" + i.toString();
      let image = <HTMLImageElement>document.getElementById(imgEl);
      
      this.canvasArray[i] = <HTMLCanvasElement>document.getElementById(canEl);
      this.canvasWidthArray[i] = this.canvasArray[i].width;
      this.canvasArray[i] = this.canvasArray[i].getContext("2d");
      this.canvasArray[i].drawImage(image,0,0);

    }

  }

  addText(i){

    // Text setting
    this.canvasArray[i].font      = "25px Simpsons"
    // this.canvasArray[i].textAlign = "center"

    // Setup for text wrap
    let inputElName   = "T" + i.toString();
    let inputEl       = <HTMLInputElement>document.getElementById(inputElName);
    let text          = "" + inputEl.value; 
    let maxWidth      = this.canvasWidthArray[i];
    let lineHeight    = 50;
    let x             = 10;
    let y             = 50;
    let words         = text.split(" ");
    let line          = "";

    // Loop over each word and add to line, if line too long; 
    //      drop last word and print the start again.
    let len = words.length;
    for (let j = 0; j < len; j++){

      let testLine = line + words[j] + " ";
      let metrics = this.canvasArray[i].measureText(testLine);
      let testWidth = metrics.width;

      if(testWidth > maxWidth){

        this.canvasArray[i].fillText(line, x, y);
        line = words[j] + "";
        y += lineHeight;

      } else {

        line = testLine;

      }

      this.canvasArray[i].fillText(line, x, y);

    }    

  }

  switchUpperLower(){

    if(this.lowerText){
      this.lowerText = false;
      this.upperLower = "Add top text"
    } else {
      this.lowerText = true;
      this.upperLower = "Add bottom text"
    }

  }

  upperButton(){

    if(this.lowerText){
      console.log("lower text selected");
      this.switchUpperLower();
    }

  }

  lowerButton(){

    if(!this.lowerText){
      console.log("upper text selected");
      this.switchUpperLower();
    }

  }

  ngOnInit() {
  }

}