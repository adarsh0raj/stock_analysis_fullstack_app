import { Component, OnInit } from '@angular/core';

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
