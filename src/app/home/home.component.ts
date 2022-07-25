import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
} from 'rxjs';
import { GetMenuService } from '../get-menu.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { PricePreparationService } from '../price-preparation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('searchInput', { static: true })
  searchInput: ElementRef;
  results: any;
  modalRef?: BsModalRef;
  modalDetails: any;
  menu: any[] = [];
  veganAmount: number = 0;
  notVeganAmount: number = 0;
  totalProm: any;
  totalPrice: any;
  promPrep: any;

  constructor(
    private getMenu: GetMenuService,
    private modalService: BsModalService,
    private prices: PricePreparationService
  ) {}

  addToMenu(dish: any) {
    if (this.menu.length === 4) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No podés agregar más de 4 platos al menú.',
      });
    } else if (this.menu.find((e) => e == dish) == dish) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No podés agregar el mismo plato más de una vez.',
      });
    } else if (dish.vegan && this.veganAmount === 2) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No podés agregar más de 2 platos veganos.',
      });
    } else if (dish.vegan) {
      this.veganAmount++;
      this.menu.push(dish);
      console.log(this.veganAmount, 'vegan added');
    } else if (this.notVeganAmount === 2) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No podés agregar más de 2 platos no veganos.',
      });
    } else if (!dish.vegan) {
      this.notVeganAmount++;
      console.log(this.notVeganAmount, 'not vegan added');
      this.menu.push(dish);
    }
    this.updateDetails();
  }

  updateDetails() {
    // send menu data to service
    this.prices.menu = this.menu;
    // call healthscore average method
    this.prices.promHealthScore();
    // set average hs variable to prom hs service variable
    this.totalProm = this.prices.prom.toFixed(2);
    // call price accumulator method
    this.prices.accPrices();
    // set price acc variable to acc service variable
    this.totalPrice = this.prices.totalPrice;
    //call preparations average method
    this.prices.promPreparations();
    // set preparation average variable to prep average service variable
    this.promPrep = this.prices.promPrep;
  }

  removeFromMenu(dish: any) {
    // this.menu.splice(dish, 1);
    const filterDish = this.menu.filter((e) => e !== dish);
    if (dish.vegan) {
      this.veganAmount--;
      console.log(this.veganAmount, 'vegan removed');
      this.menu = filterDish;
      this.updateDetails();
    } else if (!dish.vegan) {
      this.notVeganAmount--;
      console.log(this.notVeganAmount, 'not vegan removed');
      this.menu = filterDish;
      this.updateDetails();
    }
  }

  search() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        map((event: any) => {
          return event.target.value;
        }),
        filter((res) => res.length > 2),
        distinctUntilChanged()
      )
      .subscribe((data: any) => {
        this.getMenu.getSearchMenuItem(data).subscribe((response) => {
          this.results = response.results;
          console.log(data, response);
        });
      });
  }

  openModal(template: TemplateRef<any>, currentItem: any) {
    this.modalRef = this.modalService.show(template);
    this.modalDetails = currentItem;
  }

  ngOnInit(): void {
    this.search();
  }
}
