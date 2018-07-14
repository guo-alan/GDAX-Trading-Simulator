import { Injectable } from "@angular/core";
import gdax from "gdax";

/*
  Generated class for the BooksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BooksProvider {
  publicClient = new gdax.PublicClient();
  constructor() {
    console.log("Hello BooksProvider Provider");
  }

  getBooks() {
    var promise = new Promise(resolve => {
      this.publicClient
        .getProductOrderBook("BTC-USD", { level: 2 })
        .then(book => {
          resolve(book);
        });
    });
    return promise;
  }
}
