import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { day } from '../../interfaces/stock';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dateprice',
  templateUrl: './dateprice.component.html',
  styleUrls: ['./dateprice.component.scss']
})
export class DatepriceComponent implements OnInit {

  constructor(private http: HttpClient) { }

  dates: string[] = [];
  date = new FormControl('');
  not_data_sent: boolean = true;
  data_sent: boolean = false;

  ngOnInit(): void {
    this.getDates();
  }

  getDates() {
    this.http.get<day[]>(`http://localhost:3000/stocks/dates`).subscribe(data => {
      this.dates = data.map((x: day) => x.date.split(' ')[0]);
      this.dates.sort();
    });
  }

  formSubmit() {
    console.log(this.date.value);
    this.date.reset();
    this.not_data_sent = false;
    this.data_sent = true;
  }
}
