import {computed, inject, Injectable, signal} from '@angular/core';
import {WellnessSummary} from '@app/vehicle-wellness/domain/model/wellness-summary.entity';
import {WellnessSummaryApiService} from '@app/vehicle-wellness/infrastructure/wellness-summary-api.service';
import {AuthenticationService} from '@app/iam/services/authentication.service';
import {retry} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SummariesStore {
  private summariesSignal = signal<WellnessSummary[]>([]);
  private readonly errorSignal = signal<string | null>(null);
  private readonly loadingSignal = signal<boolean>(false);

  readonly summaries = computed(() => this.summariesSignal());
  readonly error = this.errorSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();

  private wellnessSummaryApi = inject(WellnessSummaryApiService);
  private authenticationService = inject(AuthenticationService);

  loadSummariesForOwner(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.authenticationService.getRoleSpecificUserId().subscribe({
      next: ownerId => {
        this.wellnessSummaryApi.getAllSummariesFromOwner(ownerId).pipe(retry(2)).subscribe({
          next: summaries => {
            this.summariesSignal.set(summaries);
            this.loadingSignal.set(false);
          },
          error: err => {
            this.errorSignal.set(this.formatError(err, 'Failed to load wellness summaries'));
            this.loadingSignal.set(false);
          }
        });
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to get owner ID'));
        this.loadingSignal.set(false);
      }
    });
  }

  generateSummaryForVehicle(vehicleId: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.wellnessSummaryApi.generateSummaryForVehicle(vehicleId).pipe(retry(1)).subscribe({
      next: summary => {
        // Add or update the summary in the list
        const currentSummaries = this.summariesSignal();
        const existingIndex = currentSummaries.findIndex(s => s.vehicleId === vehicleId);

        if (existingIndex >= 0) {
          const updatedSummaries = [...currentSummaries];
          updatedSummaries[existingIndex] = summary;
          this.summariesSignal.set(updatedSummaries);
        } else {
          this.summariesSignal.update(summaries => [summary, ...summaries]);
        }

        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to generate wellness summary'));
        this.loadingSignal.set(false);
      }
    });
  }

  loadSummaryByVehicleId(vehicleId: number): WellnessSummary | undefined {
    return this.summariesSignal().find(s => s.vehicleId === vehicleId);
  }

  clearError(): void {
    this.errorSignal.set(null);
  }

  reset(): void {
    this.summariesSignal.set([]);
    this.errorSignal.set(null);
    this.loadingSignal.set(false);
  }

  // Helper to allow fallback, if it ever has an error, which would be unfortunate but it's there
  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message;
    }
    return fallback;
  }
}
