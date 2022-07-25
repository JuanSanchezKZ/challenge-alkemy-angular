import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  APIkey: string = '4a9dfea1f382464c9f4de3830dc68e31';

  constructor(private http: HttpClient) {}

  getMenuItemSearch(querySearch: any): Observable<any> {
    return this.http.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${querySearch}&number=10&addRecipeInformation=true&apiKey=${this.APIkey}`
    );
  }
}
