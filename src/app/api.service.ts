import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  APIkey: string = 'fa8d7cc3236f4da3a922c9220196ece0';

  constructor(private http: HttpClient) {}

  getMenuItemSearch(querySearch: any): Observable<any> {
    return this.http.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${querySearch}&number=10&addRecipeInformation=true&apiKey=${this.APIkey}`
    );
  }

  getMenuItemById(id: any): Observable<any> {
    return this.http.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.APIkey}`
    );
  }
}
