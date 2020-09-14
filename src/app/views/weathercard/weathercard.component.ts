import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-weathercard',
  templateUrl: './weathercard.component.html',
  styleUrls: ['./weathercard.component.css']
})
export class WeathercardComponent implements OnInit {
  @Input() title = '';
  @Input() clouds = '';
  @Input() temp = '';
  @Input() temp_min = '';
  @Input() temp_max = '';
  @Input() show: boolean;

  // defined Output for passing method from child to parent
  @Output() removeCity: EventEmitter<any> = new EventEmitter();
  @Output() toggleForecast: EventEmitter<any> = new EventEmitter();
  cities: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  // just wrote a converter
  float2int(temp: any) {
    // tslint:disable-next-line:no-bitwise
    return temp | 0;
  }

  // toggle forecast
  showForecast(title: string) {
    this.toggleForecast.emit(title)
  }

  // removeCity method from child to parent
  remove(title: string) {
    this.removeCity.emit(title)
  }
}
