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
      acc = acc + i.healthScore / this.menu.length;
    }
    this.prom = acc;
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
      acc = acc + i.readyInMinutes / this.menu.length;
    }
    this.promPrep = acc;
  }
}
