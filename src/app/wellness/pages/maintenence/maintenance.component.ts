import { Component } from '@angular/core';
import { ScheduledMaintenance } from '@app/wellness/model/schedule-maintenance.entity';
import { CompletedMaintenance } from '@app/wellness/model/completed-maintenance.entity';
import { format } from "@formkit/tempo";
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceDialogComponent } from '@app/wellness/components/maintenance-dialog/maintenance-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maintenence',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <section class="section">
        <h2 class="section-title">Scheduled Maintenances</h2>
        <div class="cards-list">
          @for (maintenance of scheduledMaintenances; track maintenance.maintenanceId) {
            <div class="maintenance-card scheduled">
              <div class="card-left-strip"></div>
              <div class="card-content">
                <div class="meta-row">
                  <span class="date-badge">{{ format(maintenance.maintenanceDate, "DD MMM, HH:mm", "es") }}</span>
                  <span class="vehicle-tag">{{ maintenance.vehicleName }}</span>
                </div>
                <h3 class="reason-title">{{ maintenance.maintenanceReason }}</h3>
                <div class="details-grid">
                  <div class="detail"><span class="label">Location</span><span class="value">{{ maintenance.maintenanceAddress }}</span></div>
                  <div class="detail"><span class="label">Mechanic</span><span class="value">{{ maintenance.mechanicName }}</span></div>
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <section class="section">
        <h2 class="section-title history">Maintenance History</h2>
        <div class="cards-list">
          @for (maintenance of completedMaintenances; track maintenance.maintenanceId) {
            <div class="maintenance-card completed" (click)="openDialog(maintenance)">
              <div class="card-content">
                <div class="meta-row">
                  <span class="date-text">{{ format(maintenance.maintenanceDate, "DD/MM/YYYY", "es") }}</span>
                  <span class="status-pill">Done</span>
                </div>
                <div class="main-info">
                  <h3 class="vehicle-name">{{ maintenance.vehicleName }}</h3>
                  <p class="summary">{{ maintenance.maintenanceDetails }}</p>
                </div>
                <div class="footer-row">
                  <span class="mechanic-info">By {{ maintenance.mechanicName }}</span>
                  <span class="view-more">View Details →</span>
                </div>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    /* ... */

    .section-title {
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
      margin-bottom: 1.5rem;
      padding-block: 0.25em;
      display: inline-block;
      width: fit-content;
      line-height: normal;
    }

    /* ... (resto de los estilos igual) ... */

    .page { max-width: 900px; margin: 0 auto; padding: 2rem; min-height: 100vh; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); }
    .section { margin-bottom: 3rem; }
    .section-title.history { background: linear-gradient(135deg, #666 0%, #333 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .cards-list { display: flex; flex-direction: column; gap: 1rem; }
    .maintenance-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); transition: all 0.3s ease; position: relative; }
    .maintenance-card.scheduled { border: 1px solid #ffe4d6; }
    .maintenance-card.scheduled:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(255, 107, 53, 0.15); }
    .card-left-strip { position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: linear-gradient(to bottom, #ff6b35, #f7931e); }
    .card-content { padding: 1.5rem; padding-left: 2rem; }
    .meta-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
    .date-badge { background: #fff5f0; color: #ff6b35; font-weight: 700; padding: 4px 10px; border-radius: 8px; font-size: 0.85rem; }
    .vehicle-tag { font-weight: 600; color: #666; font-size: 0.9rem; }
    .reason-title { margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 700; color: #1a1a1a; }
    .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .detail { display: flex; flex-direction: column; }
    .label { font-size: 0.7rem; text-transform: uppercase; color: #999; font-weight: 700; }
    .value { font-size: 0.9rem; color: #333; }
    .maintenance-card.completed { cursor: pointer; border-left: 6px solid #ccc; }
    .maintenance-card.completed:hover { background: #fafafa; border-left-color: #666; }
    .maintenance-card.completed .date-text { color: #999; font-weight: 600; font-size: 0.85rem; }
    .status-pill { background: #e0e0e0; color: #555; font-size: 0.7rem; padding: 2px 8px; border-radius: 10px; font-weight: 700; text-transform: uppercase; }
    .vehicle-name { margin: 0.5rem 0 0.25rem; font-size: 1.1rem; color: #333; }
    .summary { color: #666; margin: 0 0 1rem 0; font-size: 0.95rem; }
    .footer-row { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f0f0f0; padding-top: 0.75rem; margin-top: 0.5rem; }
    .mechanic-info { font-size: 0.8rem; color: #999; }
    .view-more { color: #ff6b35; font-weight: 600; font-size: 0.85rem; }
  `]
})
export class MaintenanceComponent {
  constructor(private dialog: MatDialog) {}
  scheduledMaintenances: ScheduledMaintenance[] = [
    { maintenanceId: 1, maintenanceDate: new Date(), maintenanceAddress: "Av. Rafael Escardo 201", mechanicName: "Hernandez Hernandez", vehicleName: "Honda CB190R", maintenanceReason: "Fallo de tanque de gasolina" },
    { maintenanceId: 2, maintenanceDate: new Date(), maintenanceAddress: "Av. Rafael Escardo 201", mechanicName: "Hernandez Hernandez", vehicleName: "Honda CB300 Twister", maintenanceReason: "Revisión general" }
  ];
  completedMaintenances: CompletedMaintenance[] = [
    { maintenanceId: 1, maintenanceDate: new Date(), maintenanceAddress: "Talambo 135", mechanicName: "Hernandez Hernandez", ownerName: "Luis Torres", vehicleName: "Honda CB300 Twister", maintenanceDetails: "Se cambiaron los neumáticos delanteros.", maintenanceDescription: "Piso una llave."}
  ];
  protected readonly format = format;
  openDialog(maintenance: CompletedMaintenance) { this.dialog.open(MaintenanceDialogComponent, { data: { maintenance } }); }
}
