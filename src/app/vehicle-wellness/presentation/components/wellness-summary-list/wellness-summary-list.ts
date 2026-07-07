import {Component, inject, OnInit} from '@angular/core';
import {WellnessSummaryApiService} from '@app/vehicle-wellness/infrastructure/wellness-summary-api.service';
import {AuthenticationService} from '@app/iam/services/authentication.service';
import {WellnessSummary} from '@app/vehicle-wellness/domain/model/wellness-summary.entity';
import {
  WellnessSummaryItem
} from '@app/vehicle-wellness/presentation/components/wellness-summary-item/wellness-summary-item';

@Component({
  selector: 'app-wellness-summary-list',
  imports: [
    WellnessSummaryItem
  ],
  templateUrl: './wellness-summary-list.html',
  styleUrl: './wellness-summary-list.css'
})
export class WellnessSummaryList implements OnInit {

  wellnessSummaryService = inject(WellnessSummaryApiService)
  authenticationService = inject(AuthenticationService)

  summaries: WellnessSummary[] = [];

  ngOnInit(): void {
   const ownerId = this.authenticationService.getRoleSpecificUserId().subscribe({
     next: ownerId => {
       const wellnessSummaries = this.wellnessSummaryService.getAllSummariesFromOwner(ownerId).subscribe({
         next: value => {
           this.summaries = value
         },
         error: err =>{
           console.log("Error obteniendo los summaries: " + err)
         }
       })
     },
     error: err => {
       console.log("Error obteniendo el id de Owner: " + err)
     }
   })

  }
}
