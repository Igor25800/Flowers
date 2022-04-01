import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {PriceService} from "../../../shared/services/price/price.service";
import {IPrice} from "../../../shared/interfaces/price.interface";
import {ActivatedRoute} from "@angular/router";
Chart.register(...registerables);

@Component({
  selector: 'app-price-change',
  templateUrl: 'price-changes.component.html',
  styleUrls: ['price-changes.component.scss']
})

export class PriceChangesComponent implements OnInit {

  canvas: any;
  ctx: any;
  arrayPrice: Array<number> = [];
  arrayDate: Array<string> = []
  @ViewChild('mychart') mychart: any;
  isActiveMoon = false;

  constructor(
    private priceService: PriceService,
    private routerActivated : ActivatedRoute
  ) {
  }


  ngOnInit(): void {
    this.getPrice();
  }

  getPrice(): void {
    const  id = this.routerActivated.snapshot.params.id
    this.priceService.getPrice(+id).subscribe((price: IPrice []) => {
      this.arrayPrice = price.map((el: any) => el.price)
      this.arrayDate = price.map((el: any) => {
        const [year, month, date] = el.date.split('-');
        const [days] = date.split(' ')
        return `${days}.${month}`
      })
      this.getCanvas();
      this.toggleMonths();
    })
  }

  toggleMonths(): void {
    this.isActiveMoon = this.arrayDate.map(el => {
      const [days, month] = el.split('.')
      return month
    }).every((el, i, [month]) => month == el)
  }

  getCanvas(): void {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d')
    let gradient = this.ctx.createLinearGradient(0, 280, 0, 0)
    gradient.addColorStop(1, '#cdf8cd');
    gradient.addColorStop(0, 'white');

    let data = {
      labels: this.arrayDate,
      datasets: [{
        backgroundColor: gradient,
        data: this.arrayPrice,
        fill: true,
        borderOffset: 0.0,
        borderJoinStyle: 'miter',
        borderBackgroundColor: '#F72585',
        pointBorderColor: '#5E9E5E',
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#5E9E5E',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        tension: 0.4,
        borderColor: "#5E9E5E",
        pointBackgroundColor: "white",
        borderWidth: 2,
      }
      ]
    }

    new Chart(this.ctx, {
      type: 'line',
      data: data as any,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Current price: Є${this.arrayPrice[this.arrayPrice.length - 1]} EUR`,
            align: 'start',
            padding: {
              bottom: 80
            },
            font: {
              size: 16,
              family: 'Montserrat',
              weight: 'bold',
            }
          },
          datalabels: {
            anchor: 'end',
            align: 'top',
            font: {
              size: 14,
              lineHeight: 2,
              family: 'Montserrat',
              style: 'normal',
            }
          },
          legend: {
            display: false,
          }
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
          },
          x: {
            display: true,
            grid: {
              display: false
            },
            beginAtZero: true,
          }
        },
        layout: {
          padding: {
            right: 20,
            left: 20
          }
        }
      },
      plugins: [ChartDataLabels],
    });
  }
}
