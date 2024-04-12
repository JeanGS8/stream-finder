import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  constructor() { }

  getRange(start: number, end: number) {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
  }

  ngOnInit() {}

}
