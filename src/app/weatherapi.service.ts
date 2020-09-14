import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {

  private readonly baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly forcastURL = 'http://api.openweathermap.org/data/2.5/forecast?q=';
  private readonly apiKey = '7d68b378c1b2195aa318b5f24d5efa0b';

  constructor(private http: HttpClient) {
  }

  // Fetching Current Weather
  getCurrentWeather = location => {
    return this.http.get(
      `${this.baseURL}${location}&APPID=${this.apiKey}&units=metric`);
  };

  // Fetching Weather Forecast
  getWeatherForecast = location => {
    return this.http.get(
      `${this.forcastURL}${location}&APPID=${this.apiKey}&units=metric`).pipe(first(), map((weather) => weather['list']));
  };
}
