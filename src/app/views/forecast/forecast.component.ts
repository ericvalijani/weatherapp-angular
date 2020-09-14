import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  @Input() day = ''
  @Input() temp = ''
  @Input() state = ''

  constructor() {
  }

  ngOnInit(): void {
  }

}
