import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PricePreparationService {
  menu: any;
  prom: number = 0;
  totalPrice: number = 0;
  promPrep: number = 0;
  constructor() {}

  promHealthScore() {
    let acc = 0;
    for (let i of this.menu) {
      acc += i.healthScore;
    }
    this.prom = acc / this.menu.length;
  }

  accPrices() {
    let acc = 0;
    for (let i of this.menu) {
      acc += i.pricePerServing;
    }
    this.totalPrice = acc;
  }

  promPreparations() {
    let acc = 0;
    for (let i of this.menu) {
      acc += i.readyInMinutes;
    }
    this.promPrep = acc / this.menu.length;
  }
}
