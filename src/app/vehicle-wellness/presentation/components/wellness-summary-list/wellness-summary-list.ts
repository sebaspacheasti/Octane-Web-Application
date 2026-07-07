import {Component, inject, OnInit} from '@angular/core';
import {
  WellnessSummaryItem
} from '@app/vehicle-wellness/presentation/components/wellness-summary-item/wellness-summary-item';
import {SummariesStore} from '@app/vehicle-wellness/application/summaries.store';

@Component({
  selector: 'app-wellness-summary-list',
  imports: [
    WellnessSummaryItem
  ],
  templateUrl: './wellness-summary-list.html',
  styleUrl: './wellness-summary-list.css'
})
export class WellnessSummaryList implements OnInit {

  summaryStore = inject(SummariesStore);

  ngOnInit(): void {
    this.summaryStore.loadSummariesForOwner();
  }

  get summaries() {
    return this.summaryStore.summaries();
  }
}