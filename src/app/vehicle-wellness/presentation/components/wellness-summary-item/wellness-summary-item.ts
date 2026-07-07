import {Component, inject, input} from '@angular/core';
import {WellnessSummary} from '@app/vehicle-wellness/domain/model/wellness-summary.entity';
import {VehiclesStore} from '@app/vehiclemanagement/application/vehicles.store';
import {Vehicle} from '@app/vehiclemanagement/domain/model/vehicle.entity';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-wellness-summary-item',
  imports: [
    MatCardContent,
    MatCard
  ],
  templateUrl: './wellness-summary-item.html',
  styleUrl: './wellness-summary-item.css'
})
export class WellnessSummaryItem {
  wellnessSummary = input.required<WellnessSummary>();

  vehicleStore = inject(VehiclesStore)

  getVehicle(): Vehicle {
    return this.vehicleStore.getVehicleById(this.wellnessSummary().vehicleId)()!;
  }
}