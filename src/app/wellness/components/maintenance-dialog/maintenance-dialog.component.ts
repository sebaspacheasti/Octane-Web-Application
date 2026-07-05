import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {CompletedMaintenance} from '@app/wellness/model/completed-maintenance.entity';
import {format} from '@formkit/tempo';
import {MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-maintenance-dialog',
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatTableModule,CommonModule],
  template: `
    <div class="w-full h-full bg-[#380800] text-white">
      <mat-dialog-content >
        <div class="text-white">
          <p><strong>Detalles del mantenimiento:</strong> {{ maintenance.maintenanceDetails }}</p>
          <p><strong>Mecanico:</strong> {{maintenance.mechanicName}}</p>
          <p><strong>Moto Asociada:</strong> {{maintenance.vehicleName}}</p>
          <p><strong>Lugar:</strong> {{maintenance.maintenanceAddress}}</p>
          <p><strong>Fecha:</strong> {{format(maintenance.maintenanceDate,"DD/MM/YYYY","es")}}</p>
          <p><strong>Hora:</strong> {{format(maintenance.maintenanceDate,"hh:mm","es")}}</p>
          <p><strong>Descipcion:</strong> {{maintenance.maintenanceDescription}}</p>
          <p class="mb-1"><strong>
            Gastos:
          </strong></p>


        </div>

      </mat-dialog-content>

      <mat-dialog-actions>
        <button matButton mat-dialog-close>Close</button>
      </mat-dialog-actions>

    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaintenanceDialogComponent {

  displayedColumns: string[] = ['Name', 'Amount', 'UnitPrice', 'TotalPrice'];


  data = inject<{ maintenance: CompletedMaintenance }>(MAT_DIALOG_DATA);
  maintenance = this.data.maintenance;
  protected readonly format = format;
}
