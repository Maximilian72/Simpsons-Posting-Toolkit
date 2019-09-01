import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  canvasArray = [];
  ctxArray = [];
  sourceArray = [];
  memeArray = [];

  data: any;
  
  constructor(private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state) {

        this.data = this.router.getCurrentNavigation().extras.state.user;

      }

      let noURLs = this.data.urls.length;
      // console.log(noURLs);

      for(let i = 0; i < noURLs; i++){

        this.sourceArray[i] = JSON.stringify(this.data.urls[i]);
        console.log(this.sourceArray[i]);

      }

    });

  }

  ngAfterViewInit(){
 
    let noMemes = this.sourceArray.length;

    for(let i = 0; i < noMemes; i++){
      
      this.canvasArray[i] = document.createElement("canvas");
      this.canvasArray[i].setAttribute("id", i);
      // this.ctxArray[i] = this.canvasArray[i].getContext("2d");
      // this.ctxArray[i].setAttribute("id", i);

      this.memeArray[i] = new Image();
      this.memeArray[i].src = this.sourceArray[i];
      this.memeArray[i].src = this.memeArray[i].src.substring(0, this.memeArray[i].src.length -3);

      this.ctxArray[i].drawImage(this.memeArray[i],0,0);

      document.getElementById("canvasContainer").appendChild(this.canvasArray[i]);

    }

  }

  ngOnInit() {
  }

}
