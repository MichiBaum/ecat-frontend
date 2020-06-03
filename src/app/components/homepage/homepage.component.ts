import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  host: {
    class:'p-col'
  }
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
