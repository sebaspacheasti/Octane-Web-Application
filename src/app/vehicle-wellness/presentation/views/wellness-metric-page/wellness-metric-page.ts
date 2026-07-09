import { Component } from '@angular/core';
import {WellnessMetricList} from '@app/vehicle-wellness/presentation/components/wellness-metric-list/wellness-metric-list';

@Component({
  selector: 'app-wellness-metric-page',
  imports: [WellnessMetricList],
  templateUrl: './wellness-metric-page.html',
  styleUrl: './wellness-metric-page.css'
})
export class WellnessMetricPage {

}
