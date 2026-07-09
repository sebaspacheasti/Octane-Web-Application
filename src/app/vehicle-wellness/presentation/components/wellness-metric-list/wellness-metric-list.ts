import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WellnessMetricItem} from '@app/vehicle-wellness/presentation/components/wellness-metric-item/wellness-metric-item';
import {MetricsStore} from '@app/vehicle-wellness/application/metrics.store';
import {WellnessMetric} from '@app/vehicle-wellness/domain/model/wellness-metric.entity';
import {ActivatedRoute} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-wellness-metric-list',
  imports: [CommonModule, WellnessMetricItem, TranslatePipe], // ← AGREGA LOS IMPORTS
  templateUrl: './wellness-metric-list.html',
  styleUrl: './wellness-metric-list.css'
})
export class WellnessMetricList implements OnInit {

  store = inject(MetricsStore);
  private route = inject(ActivatedRoute);

  metrics = this.store.metrics;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const vehicleId = params['vehicleId'];

      console.log("Vehicle Id ", vehicleId);

      if (vehicleId) {
        console.log("Loaded metrics");
        this.store.loadMetricsByVehicleId(vehicleId);
      } else {
        this.store.loadAllMetrics();
      }
    });
  }

  onMetricSelected(metric: WellnessMetric) {
    console.log('Métrica seleccionada:', metric);
  }
}
