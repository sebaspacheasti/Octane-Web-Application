import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map, Observable, of, delay} from 'rxjs';
import {WellnessMetric} from '@app/vehicle-wellness/domain/model/wellness-metric.entity';
import {
  CreateWellnessMetricResource, UpdateWellnessMetricResource,
  WellnessMetricResource,
  WellnessMetricsResponse
} from '@app/vehicle-wellness/infrastructure/wellness-metrics.response';
import {WellnessMetricAssembler} from '@app/vehicle-wellness/infrastructure/wellness-metric.assembler';
import {MOCK_WELLNESS_METRICS, getMockMetricsByVehicleId} from '@app/vehicle-wellness/infrastructure/wellness-metric-mock.data';

@Injectable({
  providedIn: 'root'
})
export class WellnessMetricApiService {
  private baseUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderWellnessMetricEndpointPath}`;
  private http = inject(HttpClient);

  // TODO: Remove this flag when backend is ready. Set to true to use real API calls.
  private USE_MOCK_DATA = false;

  getWellnessMetricById(id: number): Observable<WellnessMetric>{
    if (this.USE_MOCK_DATA) {
      // Mock data implementation
      const mockMetric = MOCK_WELLNESS_METRICS.find(m => m.id === id);
      if (mockMetric) {
        return of(WellnessMetricAssembler.toEntityFromResource(mockMetric)).pipe(delay(500));
      }
      return of(new WellnessMetric()).pipe(delay(500));
    }

    return this.http.get<WellnessMetricResource>(`${this.baseUrl}/${id}`)
      .pipe(
        map(resource => WellnessMetricAssembler.toEntityFromResource(resource))
      );
  }

  getAllWellnessMetrics(): Observable<WellnessMetric[]>{
    if (this.USE_MOCK_DATA) {
      // Mock data implementation with delay to simulate network request
      return of(MOCK_WELLNESS_METRICS)
        .pipe(
          delay(500),
          map(response => WellnessMetricAssembler.toEntitiesFromResponse(response))
        );
    }

    return this.http.get<WellnessMetricResource[]>(this.baseUrl)
      .pipe(
        map(response => WellnessMetricAssembler.toEntitiesFromResponse(response))
      );
  }

  getWellnessMetricsByVehicleId(vehicleId: number): Observable<WellnessMetric[]>{
    if (this.USE_MOCK_DATA) {
      // Mock data implementation - filter by vehicle ID
      const mockMetrics = getMockMetricsByVehicleId(vehicleId);
      return of(mockMetrics)
        .pipe(
          delay(500),
          map(response => WellnessMetricAssembler.toEntitiesFromResponse(response))
        );
    }

    return this.http.get<WellnessMetricResource[]>(`${this.baseUrl}/vehicle/${vehicleId}`)
      .pipe(
        map(response => WellnessMetricAssembler.toEntitiesFromResponse(response))
      );
  }

  createWellnessMetric(wellnessMetric: WellnessMetric): Observable<WellnessMetric> {
    if (this.USE_MOCK_DATA) {
      // Mock data implementation - simulate creating a new metric
      const newId = Math.max(...MOCK_WELLNESS_METRICS.map(m => m.id)) + 1;
      const createdMetric: WellnessMetricResource = {
        ...WellnessMetricAssembler.toResourceFromEntity(wellnessMetric),
        id: newId,
        registeredAt: new Date()
      };
      return of(createdMetric)
        .pipe(
          delay(500),
          map(resource => WellnessMetricAssembler.toEntityFromResource(resource))
        );
    }

    const createResource=WellnessMetricAssembler.toResourceFromEntity(wellnessMetric);
    return this.http.post<WellnessMetricResource>(this.baseUrl, createResource)
      .pipe(
        map(resource => WellnessMetricAssembler.toEntityFromResource(resource))
      );
  }

  updateWellnessMetric(id: number, wellnessMetric: WellnessMetric): Observable<WellnessMetric> {
    if (this.USE_MOCK_DATA) {
      // Mock data implementation - simulate updating a metric
      const updatedResource = WellnessMetricAssembler.toResourceFromEntity(wellnessMetric);
      return of(updatedResource)
        .pipe(
          delay(500),
          map(resource => WellnessMetricAssembler.toEntityFromResource(resource))
        );
    }

    const updateResource = WellnessMetricAssembler.toResourceFromEntity(wellnessMetric);
    return this.http.put<WellnessMetricResource>(`${this.baseUrl}/${id}`, updateResource)
      .pipe(
        map(resource => WellnessMetricAssembler.toEntityFromResource(resource))
      );
  }

  deleteWellnessMetric(id: number): Observable<void> {
    if (this.USE_MOCK_DATA) {
      // Mock data implementation - simulate deleting a metric
      return of(void 0).pipe(delay(500));
    }

    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}


