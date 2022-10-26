import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { day, stock } from '../../interfaces/stock';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dateprice',
  templateUrl: './dateprice.component.html',
  styleUrls: ['./dateprice.component.scss']
})
export class DatepriceComponent implements OnInit {

  constructor(private http: HttpClient) { }

  dates: string[] = [];
  stcks: stock[] = [];
  date = new FormControl('');
  date_data: any;
  default_stocks: string = 'BANG-5PAISA-RELIANCE-TATASTEEL-TATAMOTORS-TATAPOWER-TATACONSUM-TATACHEM-TATACOMM-TATAELXSI';

  not_data_sent: boolean = true;
  data_sent: boolean = false;
 
  chartLineData = {
    labels: ['BANG', '5PAISA', 'RELIANCE', 'TATASTEEL', 'TATAMOTORS', 'TATAPOWER', 'TATACONSUM', 'TATACHEM', 'TATACOMM', 'TATAELXSI'],
    datasets: [
      {
        label: '',
        backgroundColor: 'rgba(220, 220, 220, 0.2)',
        borderColor: 'rgba(220, 220, 220, 1)',
        pointBackgroundColor: 'rgba(220, 220, 220, 1)',
        pointBorderColor: '#fff',
        data: [0,0,0,0,0,0,0,0,0,0],
      }
    ]
  };

  chartLineOptions = {
    maintainAspectRatio: false,
  };
  chartData: boolean = false;

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
    this.date_data = this.date.value;
    this.http.get<stock[]>(`http://localhost:3000/stocks/${this.default_stocks}/${this.date.value}`).subscribe(data => {
      console.log(data);
      this.stcks = data.map(x => { return { ...x, date: x.date.split(' ')[0] }});
      this.date.reset();
      this.chartLineData.datasets[0].data = this.stcks.map(x => x.close);
      this.chartLineData.datasets[0].label = this.date_data;
      this.chartData = true;
    });
    this.not_data_sent = false;
    this.data_sent = true;
  }

  resetData() {
    this.date.reset();
    this.not_data_sent = true;
    this.data_sent = false;
    this.chartData = false;
    this.stcks = [];
    this.chartLineData.datasets[0].data = [0,0,0,0,0,0,0,0,0,0];
    this.chartLineData.datasets[0].label = '';
  }
}
