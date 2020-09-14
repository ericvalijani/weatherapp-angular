import {Component, OnInit} from '@angular/core';
import {WeatherapiService} from '../../weatherapi.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  daysForecast: Array<any> = [];
  weatherArray: any;
  error: any;
  weatherData: Array<any> = [];
  forecastData: Array<any> = [];
  showForecast: boolean;
  weatherSearchForm = new FormGroup({
    city: new FormControl()
  });

  constructor(
    private weatherApi: WeatherapiService
  ) {
  }

  ngOnInit() {
    // localStorage.setItem('weatherList', JSON.stringify(['tehran', 'los angeles', 'new york', 'toronto', 'shiraz']))

    // Get the existing data
    this.weatherArray = localStorage.getItem('weatherList');

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    this.weatherArray = this.weatherArray ? JSON.parse(this.weatherArray) : [];

    // getting dashboard current cities Weather
    for (const item of this.weatherArray) {
      this.weatherApi.getCurrentWeather(item).subscribe(data => {
        this.weatherData.push(data);
      })
    }
  }

  // toggle forecast tab and getting forecast API
  toggleForecast(title: string) {
    this.showForecast = true;
    this.daysForecast = []
    this.weatherApi.getWeatherForecast(title).subscribe((payload: any) => {

      // getting only five days of week from 40 values of an array
      const dates = {};
      for (const res of payload) {
        const date = new Date(res.dt_txt).toDateString().split(' ')[0];
        if (dates[date]) {
          dates[date].counter += 1;
          dates[date].temp += res.main.temp;
        } else {
          dates[date] = {
            state: res.weather[0].main,
            temp: res.main.temp,
            counter: 1
          };
        }
      }
      delete dates[Object.keys(dates)[0]];

      // Sorting days of week
      Object.keys(dates).forEach((day) => {
        dates[day].temp = Math.round(dates[day].temp / dates[day].counter);
        dates[day].day = day;
        this.daysForecast.push(dates[day]);
      });

      console.log(this.daysForecast)
    })
  }

  removeCity(city: string) {
    this.showForecast = false;
    this.daysForecast = []
    this.weatherArray = this.weatherArray.filter(data => {
        return data !== city.toLowerCase()
      }
    );
    this.weatherData = this.weatherData.filter(item => {
        return item.name.toLowerCase() !== city.toLowerCase()
      }
    );

    // removing city from storage
    localStorage.setItem('weatherList', JSON.stringify(this.weatherArray));
  }

  // getting current weather API
  getWeather(formValue) {

    // accepting only 5 cities
    if (this.weatherArray.length < 5) {
      // if city does not exist in dashboard then add the city
      if (this.weatherArray.indexOf(formValue.city.toLowerCase()) === -1) {
        this.weatherApi.getCurrentWeather(formValue.city).subscribe(data => {

            // updating existing data
            this.weatherArray.push(formValue.city.toLowerCase());
            localStorage.setItem('weatherList', JSON.stringify(this.weatherArray));

            this.weatherData.push(data);
          },
          error => this.error = 'Error in finding City !!!');
      }
    }
  }
}
