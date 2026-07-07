import {WellnessSummaryResource, WellnessSummaryResponse} from '@app/vehicle-wellness/infrastructure/wellness-summary.response';
import {WellnessSummary} from '@app/vehicle-wellness/domain/model/wellness-summary.entity';


export class WellnessSummaryAssembler {

  static toEntityFromResource(resource: WellnessSummaryResource): WellnessSummary{
    return{
      vehicleId: resource.vehicleId,
      summary: resource.summary,
      status: resource.status,
    }
  }

  static toEntitiesFromResponse(response: WellnessSummaryResource[]): WellnessSummary[] {
    return response.map(wellnessSummaryResource => this.toEntityFromResource(wellnessSummaryResource));
  }

}
