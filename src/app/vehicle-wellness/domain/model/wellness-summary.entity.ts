export class WellnessSummary {
  vehicleId: number;
  status: string;
  summary: string;
  constructor(status: string, summary: string, vehicleId: number) {
    this.status = status;
    this.vehicleId = vehicleId;
    this.summary = summary;
  }
}
