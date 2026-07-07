import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {WellnessSummary} from '@app/vehicle-wellness/domain/model/wellness-summary.entity';
import {map, Observable} from 'rxjs';
import {WellnessSummaryResource} from '@app/vehicle-wellness/infrastructure/wellness-summary.response';
import {WellnessMetricAssembler} from '@app/vehicle-wellness/infrastructure/wellness-metric.assembler';
import {WellnessSummaryAssembler} from '@app/vehicle-wellness/infrastructure/wellness-summary.assembler';
import {WellnessMetric} from '@app/vehicle-wellness/domain/model/wellness-metric.entity';


@Injectable({
  providedIn: 'root'
})
export class WellnessSummaryApiService {
  private baseUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderVehiclesEndpointPath}`;
  private http = inject(HttpClient);

  getLastSummaryFromVehicle(vehicleId: number):Observable<WellnessSummary>{
    return this.http.get<WellnessSummaryResource>(`${this.baseUrl}/${vehicleId}/wellness-summary`)
      .pipe(
        map(resource => WellnessSummaryAssembler.toEntityFromResource(resource))
      );
 }
  getAllSummariesFromOwner(ownerId: number):  Observable<WellnessSummary[]>{
    return this.http.get<WellnessSummaryResource[]>(`${this.baseUrl}/owner/${ownerId}/wellness-summaries`)
      .pipe(
        map(resource => WellnessSummaryAssembler.toEntitiesFromResponse(resource))
      );
  }
}
