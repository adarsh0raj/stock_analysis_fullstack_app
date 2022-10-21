import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { day, stock } from '../../interfaces/stock';
import { FormControl } from '@angular/forms';

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

  stcks: stock[] = [];

  not_data_sent: boolean = true;
  data_sent: boolean = false;

  symbol = new FormControl('');
  startdate = new FormControl('');
  enddate = new FormControl('');
  data_arr: any[] = [];

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

  formSubmit() {
    this.data_arr = [this.symbol.value, this.startdate.value, this.enddate.value];
    this.http.get<stock[]>(`http://localhost:3000/stocks/${this.symbol.value}/${this.startdate.value}/${this.enddate.value}`).subscribe(data => {
      console.log(data);
      this.stcks = data.map(x => { return { ...x, date: x.date.split(' ')[0] }});
      this.symbol.reset();
      this.startdate.reset();
      this.enddate.reset();
    });
    this.not_data_sent = false;
    this.data_sent = true;
  }

  resetData() {
    this.symbol.reset();
    this.startdate.reset();
    this.enddate.reset();
    this.not_data_sent = true;
    this.data_sent = false;
    this.stcks = [];
  }

}
