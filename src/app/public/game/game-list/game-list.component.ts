import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppList, GameModel, GameModel2, GamesList } from '../../dtos/game.type';
import { GameService } from '../../services/game-service.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit{

  games: GameModel[] = [];

  constructor(
    private _gameService: GameService,
    private _http: HttpClient,
  ){}

  ngOnInit(): void {
    this.getAllGames();
  }

  
  gameList: GameModel[] = [];

  getAllGames(){
    this._gameService.getAll()
      .subscribe({
        next: (result:any) => {
          this.games = result.applist.apps;
        },
        error: () => {
          console.log('error All Games');
        }
      });
  }

  addGame(game:any){
    this.gameList.push(game);
    console.log(this.gameList);
  }

  // listGames(){
  //   this.games$ = this._gameService.getAll()
  //     .subscribe(
  //         (res:any) => this.games3 = res as []);
  // }

  // "applist":{"apps":[{"appid":1941401,"name":""}]}
}
