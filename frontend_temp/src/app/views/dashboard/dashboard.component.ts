import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() {
  }

  start_date: Date = new Date();
  end_date: Date = new Date();
  ngOnInit(): void {
  }

}
