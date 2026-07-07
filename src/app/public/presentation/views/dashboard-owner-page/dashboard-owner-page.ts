import {Component, inject, OnInit} from '@angular/core';
import {AssignmentsStore} from '@app/assignments/application/assigments.store';
import {VehiclesStore} from '@app/vehiclemanagement/application/vehicles.store';
import {MaintenanceStore} from '@app/maintenance-and-operations/application/maintenance.store';
import {ExpenseStore} from '@app/maintenance-and-operations/application/expense.store';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Vehicle} from '@app/comparatives/model/model';
import {TranslatePipe} from '@ngx-translate/core';
import {
  WellnessSummaryList
} from '@app/vehicle-wellness/presentation/components/wellness-summary-list/wellness-summary-list';
import {SummariesStore} from '@app/vehicle-wellness/application/summaries.store';

@Component({
  selector: 'app-dashboard-owner-page',
  imports: [
    NgOptimizedImage,
    RouterLink,
    DatePipe,
    TranslatePipe,
    WellnessSummaryList
  ],
  templateUrl: './dashboard-owner-page.html',
  standalone: true,
  styleUrl: './dashboard-owner-page.css'
})
export class DashboardOwnerPage implements OnInit {
  private store = inject(AssignmentsStore);

  private vehiclesStore = inject(VehiclesStore);
  private maintenanceStore = inject(MaintenanceStore);
  private expenseStore = inject(ExpenseStore);
  private wellnessSummaryStore = inject(SummariesStore);

  ngOnInit() {
    const roleId = localStorage.getItem("role_id");
    if (roleId) {
      setTimeout(() => {
        this.store.getAssignmentByOwnerId(+roleId);
        this.vehiclesStore.loadVehiclesByOwner(+roleId);
        const vehicles = this.vehiclesStore.vehicles();
        console.log(vehicles);
        vehicles.forEach((vehicle) => {
          this.maintenanceStore.loadMaintenancesByVehicleId(vehicle.id);
        })
        this.wellnessSummaryStore.loadSummariesForOwner();
      }, 500)
    }
  }

  generateSummary(vehicleId: number) {
    this.wellnessSummaryStore.generateSummaryForVehicle(vehicleId);
  }

  get ownerAssignment() {
    return this.store.ownerAssignment;
  }

  get ownerVehicles() {
    return this.vehiclesStore.vehicles;
  }

  get ownerExpenses() {
    return this.expenseStore.expenses;
  }

  get ownerMaintenances() {
    return this.maintenanceStore.maintenances;
  }

  getVehicleById(id: number) {
    return this.vehiclesStore.getVehicleById(id)
  }
}
