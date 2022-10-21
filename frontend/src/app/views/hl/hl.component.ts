import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { day } from '../../interfaces/stock';

@Component({
  selector: 'app-hl',
  templateUrl: './hl.component.html',
  styleUrls: ['./hl.component.scss']
})
export class HlComponent implements OnInit {

  constructor(private http: HttpClient) { }

  dates: string[] = [];
  start_date: string = '';
  end_date: string = '';

  ngOnInit(): void {
    this.getDates();
  }

  getDates() {
    this.http.get<day[]>(`http://localhost:3000/stocks/dates`).subscribe(data => {
      this.dates = data.map((x: day) => x.date.split(' ')[0]);
      this.dates.sort();
      this.start_date = this.dates[0];
      this.end_date = this.dates[this.dates.length - 1];
      // console.log(this.dates);
    });
  }

}
