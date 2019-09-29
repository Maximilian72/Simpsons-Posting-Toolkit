import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
// import { DataService } from '../services/data.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit {

  data = {
    urls: [
      '../../../assets/images/Simpsons_FamilyPicture.png',
      '../../../assets/images/Simpsons_cast.png'
    ]
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openCreate(){

    let navigationExtras: NavigationExtras = {
      state: {
        urls: this.data
      }
    };
    this.router.navigate(['create'], navigationExtras);

  }

}
