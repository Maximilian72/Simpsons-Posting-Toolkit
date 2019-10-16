import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  canvasArray = [];
  sourceArray = [];

  urlsIn: any;
 
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
      this.canvasArray[i] = this.canvasArray[i].getContext("2d");
      this.canvasArray[i].drawImage(image,0,0);

      // Testing TEXT
      this.canvasArray[i].font = "15px Simpsons"
      this.canvasArray[i].fillText("Noodleman", 10, 15)

    }

  }

  ngOnInit() {
  }

}
