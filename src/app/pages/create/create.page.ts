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

  parser = new DOMParser();
  
  constructor(private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state) {

        this.data = this.router.getCurrentNavigation().extras.state.user;

      }

      let noURLs = this.data.urls.length;

      for(let i = 0; i < noURLs; i++){

        this.sourceArray[i] = this.data.urls[i];
        console.log(this.sourceArray[i]);

      }

    });

  }

  ionViewWillEnter(){
 
    let noMemes = this.sourceArray.length;
    for(let i = 0; i < noMemes; i++){
      
      this.memeArray[i] = new Image();
      this.memeArray[i].src = this.sourceArray[i];

      this.canvasArray[i] = document.createElement("canvas");

      this.canvasArray[i] = this.canvasArray[i].getContext("2d");

      this.canvasArray[i].drawImage(this.memeArray[i],0,0);

      document.getElementById("canvasContainer").appendChild(this.canvasArray[i]);

    }

  }

  ngOnInit() {
  }

}
