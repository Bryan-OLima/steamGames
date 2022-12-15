import { Component, OnInit } from '@angular/core';
import { AppList, GameModel } from '../../dtos/game.type';
import { GameService } from '../../services/game-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GameGetModel } from '../../dtos/get-game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  games: GameModel[] = [
    {
      appid: 252950,
      name: 'Rocket League',
    },
    {
      appid: 1811260,
      name: 'EA SPORTS™ FIFA 23',
    },
    {
      appid: 1245620,
      name: 'ELDEN RING',
    },
    {
      appid: 1091500,
      name: 'Cyberpunk 2077',
    },
    {
      appid: 1517290,
      name: 'Battlefield™ 2042',
    },
  ];

  appid: any;

  game:GameGetModel = {    
    appid: 0,
    name: '',
    icon:'',
    community_visible_stats: false,
    propagation: '',
    has_adult_content: false,
    app_type: 0
  }


  gamesss: any[] = [];

  gameList: any[]= [];

  constructor(
    private _gameService: GameService,
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  // getSingleGame(appid: string){
  //   this._gameService.getGame(appid)
  //     .subscribe((data: GameGetModel) => this.game = {
  //       appid: data.appid,
  //       name: data.name,
  //       icon: data.icon,
  //       community_visible_stats: data.community_visible_stats,
  //       propagation: data.propagation,
  //       has_adult_content: data.has_adult_content,
  //       app_type: data.app_type
  //     });
  //    alert(this.game);
  // }

  getSingleGame(appid: number) {
    this._gameService.getGame(appid)
      .subscribe({
        next: (result:GameGetModel) => {
          this.game = result;
          console.log(this.game);
        },
        error: () => {
          console.log('Error Single Game');
        }
      })
  }

  getAllGames(){
    this._gameService.getAll()
      .subscribe({
        next: (result:any) => {
          this.gamesss = result;
          console.log(this.gamesss);
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

}