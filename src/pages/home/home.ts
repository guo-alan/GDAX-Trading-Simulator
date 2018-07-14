import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { BooksProvider } from "../../providers/books/books";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  totalBids: any = [];
  bids: any = { price: [], qty: [] };
  totalAsks: any = [];
  asks: any = { price: [], qty: [] };
  labels: any = [];
  buyPrice: Number;
  buyAmount: Number;
  askPrice: Number;
  askAmount: Number;
  constructor(public navCtrl: NavController, public books: BooksProvider) {}

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          barThickness: 40
        }
      ]
    },
    height: 500
  };
  public barChartLabels: string[] = this.labels;
  public barChartType: string = "bar";
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: this.totalBids, label: "Bids" },
    { data: this.totalAsks, label: "Asks" }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  update() {
    this.totalBids = [];
    this.totalAsks = [];
    this.labels = [];
    this.fetchData();
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    this.barChartData = clone;
  }

  ionViewDidEnter() {
    this.fetchData();
    setInterval(() => {
      this.update();
    }, 1000);
  }

  fetchData() {
    this.books.getBooks().then((marketBook: any) => {
      for (let x = 0; this.labels.length < 20; x++) {
        this.bids.price[x] = Number(marketBook.bids[x][0]);
        this.bids.qty[x] = Number(marketBook.bids[x][1]);
        this.labels.unshift(marketBook.bids[x][0]);
        if (x == 0) {
          this.totalBids.push(Number(marketBook.bids[x][1]));
        } else {
          this.totalBids.push(
            Number(this.totalBids[x - 1]) + Number(marketBook.bids[x][1])
          );
        }
        this.totalAsks.push("");
      }
      for (let x = 0; this.labels.length < 40; x++) {
        this.asks.price[x] = Number(marketBook.asks[x][0]);
        this.asks.qty[x] = Number(marketBook.asks[x][1]);
        this.labels.push(marketBook.asks[x][0]);
        if (x == 0) {
          this.totalAsks.push(marketBook.asks[x][1]);
        } else {
          this.totalAsks.push(
            Number(this.totalAsks[x + 19]) + Number(marketBook.asks[x][1])
          );
        }
      }
      this.totalBids.reverse();
      this.barChartData = [
        { data: this.totalBids, label: "Bids" },
        { data: this.totalAsks, label: "Asks" }
      ];
    });
  }

  buy(){

  }

  sell(){
    
  }
}
