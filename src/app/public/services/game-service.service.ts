import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Settings from 'src/assets/api-settings.json'
import { AppList, GamesList } from '../dtos/game.type';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // OBS: apiUrlPartner is another open api from Steam. 
  // Is a link that you can evenly trade items or something else
  // private _apiUrlPartner: string = 'https://partner.steam-api.com/IInventoryService/GetInventory/v1/'  get invetory not working
  private _settings = Settings;
  private _apiUrl = this._settings.apiUrl;

  private _games: string = 'GetAppList/v2/';
  private _game: string = 'GetApps/v1/';

  constructor(
    public http: HttpClient,
  ) {}

  getAll():any {
    return this.http.get<any>(`${this._apiUrl}${this._settings.steamApps}${this._games}`);
  }

  getGame(id:any): any{
    return this.http.get<any>(`${this._apiUrl}${this._settings.comunityService}${this._game}?appids%5B0%5D=${id}&format=json`);
  }
}
