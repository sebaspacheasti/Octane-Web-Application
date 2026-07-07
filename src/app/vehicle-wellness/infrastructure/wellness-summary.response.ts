import {BaseResponse} from '@app/shared/infrastructure/base-response';

export interface WellnessSummaryResponse extends BaseResponse {
  wellnessSummary: WellnessSummaryResource[];
}

export interface WellnessSummaryResource {
  id: number;
  vehicleId: number;
  summary: string;
  status: string;
  updatedAt: string;
}

