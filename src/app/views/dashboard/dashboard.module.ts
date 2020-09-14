import {NgModule} from '@angular/core';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {WeathercardComponent} from '../weathercard/weathercard.component';
import {ForecastComponent} from '../forecast/forecast.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    WeathercardComponent,
    ForecastComponent
  ],
  declarations: [DashboardComponent, WeathercardComponent, ForecastComponent]
})
export class DashboardModule {
}
