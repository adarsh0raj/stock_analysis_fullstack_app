import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { day } from '../../interfaces/stock';


@Component({
  selector: 'app-dateprice',
  templateUrl: './dateprice.component.html',
  styleUrls: ['./dateprice.component.scss']
})
export class DatepriceComponent implements OnInit {

  constructor(private http: HttpClient) { }

  dates: string[] = [];

  ngOnInit(): void {
    this.getDates();
  }

  getDates() {
    this.http.get<day[]>(`http://localhost:3000/stocks/dates`).subscribe(data => {
      this.dates = data.map((x: day) => x.date.split(' ')[0]);
      this.dates.sort();
    });
  }
}
