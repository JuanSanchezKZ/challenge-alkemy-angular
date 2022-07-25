import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class GetMenuService {
  constructor(private api: ApiService) {}

  getSearchMenuItem(querySearch: any) {
    return this.api.getMenuItemSearch(querySearch);
  }
}
