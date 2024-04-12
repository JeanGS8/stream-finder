import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent  implements OnInit {

  constructor() { }

  getRange(start: number, end: number) {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
  }

  ngOnInit() {}

}
