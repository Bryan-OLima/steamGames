import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Settings from 'src/assets/api-settings.json';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  // OBS: apiUrlPartner is another open api from Steam. 
  // private apiUrlPartner: string = 'https://partner.steam-api.com/IInventoryService/GetInventory/v1/' isn't already working. fix in progress
  private _settings: any = Settings;
  private _apiUrl: any = this._settings.apiUrl;
  private _apiKey: any = 'F9B343ACAF523862B7AD3DABCF39B01A'

  private _playerLvl: string = 'GetSteamLevel/v1/?key=';
  private _lastGames: string = 'GetRecentlyPlayedGames/v1/?key=';
  private _ownedGames: string = 'GetOwnedGames/v1/?key='; 
  private _friends: string = 'GetFriendList/v1/?key=';
  private _playersOnline: string = 'GetNumberOfCurrentPlayers/v1/?key=';
  private _statsForGame: string = 'GetUserStatsForGame/v2/?key=';

  constructor(
    public http: HttpClient,
  ) { }

  getLastPlayedGames(steamId:string, qnt: string){
    return this.http.get<any>(`${this._apiUrl}${this._settings.player}${this._lastGames}${this._apiKey}&steamid=${steamId}&count=${qnt}`);
  }

  getLastPlayedGame(steamId: string){
    return this.http.get<any>(`${this._apiUrl}${this._settings.player}${this._lastGames}${this._apiKey}&steamid=${steamId}&count=1`);
  }

  getOwnedGames(steamId: string){
    return this.http.get<any>(`${this._apiUrl}${this._settings.player}${this._ownedGames}${this._apiKey}&steamid=${steamId}&include_appinfo=true`);
  }

  getSteamLevel(steamId: string){
    return this.http.get<any>(`${this._apiUrl}${this._settings.player}${this._playerLvl}${this._apiKey}&steamid=${steamId}`);
  }

  getFriends(steamId: string){
    return this.http.get<any>(`${this._apiUrl}${this._settings.user}${this._friends}${this._apiKey}&steamid=${steamId}`);
  }

  getPlayersOnlineByGame(appId: string){
    return this.http.get<any>(`${this._apiUrl}${this._settings.userStats}${this._playersOnline}${this._apiKey}&appid=${appId}`);
  }

  getAchievements(steamId: string, appId: string){
    return this.http.get<any>(`${this._apiUrl}${this._settings.userStats}${this._statsForGame}${this._apiKey}&steamid=${steamId}&appid=${appId}`);
  }
}












// private _playerLvl: string = 'IPlayerService/GetSteamLevel/v1/';
// private _lastGames: string = 'IPlayerService/GetRecentlyPlayedGames/v1/?key=C9B41CE7B9546971E28730F94BE6552B&steamid='
// private _ownedGames: string = 'IPlayerService/GetOwnedGames/v1/?key=C9B41CE7B9546971E28730F94BE6552B'

// private _authServToken: string = 'IAuthenticationService/GenerateAccessTokenForApp/v1/';


//https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=C9B41CE7B9546971E28730F94BE6552B&steamid=76561198105005053 get steam level
// https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=C9B41CE7B9546971E28730F94BE6552B&steamid=76561198105005053 get friends
// https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=C9B41CE7B9546971E28730F94BE6552B&appid=730 get players online
// https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=C9B41CE7B9546971E28730F94BE6552B&appid=730 get schema for game
// https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=C9B41CE7B9546971E28730F94BE6552B&steamid=76561198105005053&appid=730 get user stats for game