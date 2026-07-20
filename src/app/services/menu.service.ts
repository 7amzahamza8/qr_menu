import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestaurantMenu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly http = inject(HttpClient);

  getMenu(restaurantId: string): Observable<RestaurantMenu> {
    return this.http.get<RestaurantMenu>(`assets/menus/${restaurantId}.json`);
  }
}
