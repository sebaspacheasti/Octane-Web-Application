import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

import {
 NotificationListComponent
} from '@app/notifications/presentation/components/app-notification-list/app-notification-list';

import {AssignmentsStore} from "@app/assignments/application/assigments.store";
import {Vehicle} from '@app/vehiclemanagement/domain/model/vehicle.entity';
import {TranslatePipe} from '@ngx-translate/core';


@Component({
  selector: 'app-assign-vehicle-card',
  imports: [
    RouterLink,
    // NotificationListComponent,
    TranslatePipe
  ],
  templateUrl: './assign-vehicle-card.html',
  standalone: true,
  styleUrl: './assign-vehicle-card.css'
})
export class AssignVehicleCard {
  @Input() vehicle!: Vehicle;

  private store = inject(AssignmentsStore);

  constructor() {
    this.store.getAssignmentByOwnerId(+localStorage.getItem('role_id')!);
  }

  get ownerAssignment() {
    return this.store.ownerAssignment();
  }

  formatDate(dateInput?: string | Date | null): string {
    if (!dateInput) { return ''; }
    const date = typeof dateInput === 'string' ? new Date(dateInput) : new Date(dateInput);
    if (isNaN(date.getTime())) { return ''; }
    return new Intl.DateTimeFormat('en-EN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  }
}
