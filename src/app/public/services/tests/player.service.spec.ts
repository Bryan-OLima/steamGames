import { TestBed } from '@angular/core/testing';

import { PlayerService } from '../player.service';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { throwError } from 'rxjs';

describe('PlayerService', () => {
  let service: PlayerService;
  let httpTestingController: HttpTestingController;

  let mockGame = [{
      appid: '123123',
      name: 'testname',     
  }]
  let mockPlayer = [{
    player_level: '10'
  }]
  let mockFriendList = [{
    steamid: '76561197985158382',
    relationship: 'friend',
    friend_since:'1539033802'
  }]
  let mockAchievements = [{
    steamID:"76561198208029088",
    gameName:"Terraria",
    achievements:[{
      name:"TIMBER",
      achieved:1
      },
      {
      name:"NO_HOBO",
      "achieved":1
    }]
  }]
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerService],
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getLastPlayedGames', ()=> {
    const spy = spyOn(service, 'getLastPlayedGames');
    service.getLastPlayedGames('', '');
    expect(spy).toHaveBeenCalled();
  });

  it('should call getLastPlayedGames and get all last played games', ()=> {
    const mock = mockGame;
    service.getLastPlayedGames('76561198208029088', '2')
      .subscribe(data => {
        expect(data).toEqual([{ appid: '123123', name: 'testname'}]);
      });

      const req = httpTestingController.expectOne(
        'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=C9B41CE7B9546971E28730F94BE6552B&steamid=76561198208029088&count=2');
      expect(req.request.method).toEqual('GET');
      req.flush(mock);
  });

  it('should call getLastPlayedGames and throw error', () => {
    const err = new Error();
    const spy = spyOn(service, 'getLastPlayedGames').and.returnValue(throwError(() => err));
    service.getLastPlayedGames('', '');

    expect(spy).toHaveBeenCalled();
  });

  it('shoud call getLastPlayedGame', ()=> {
    const spy = spyOn(service, 'getLastPlayedGame');
    service.getLastPlayedGame('');
    expect(spy).toHaveBeenCalled();
  });

  it('should call getLastPlayedGame and get last game played', () => {
    const mock = mockGame;
    service.getLastPlayedGame('76561198208029088')
      .subscribe(data => {
        expect(data).toEqual([{ appid: '123123', name: 'testname'}]);
      });

      const req = httpTestingController.expectOne(
        'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=C9B41CE7B9546971E28730F94BE6552B&steamid=76561198208029088&count=1');
      expect(req.request.method).toEqual('GET');
      req.flush(mock);
  });

  it('should call getLastPlayedGame and throw error', () => {
    const err = new Error();
    const spy = spyOn(service, 'getLastPlayedGame').and.returnValue(throwError(() => err));
    service.getLastPlayedGame('');

    expect(spy).toHaveBeenCalled();
  });

  it('should call getOwnedGames', ()=> {
    const spy = spyOn(service, 'getOwnedGames');
    service.getOwnedGames('');
    expect(spy).toHaveBeenCalled();
  });

  it('should call getOwnedGames and get all owned games', () => {
    const mock = mockGame;
    service.getOwnedGames('76561198208029088')
      .subscribe(data => {
        expect(data).toEqual([{ appid: '123123', name: 'testname'}]);
      });

      const req = httpTestingController.expectOne(
        'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=C9B41CE7B9546971E28730F94BE6552B&steamid=76561198208029088&include_appinfo=true'
        );
      expect(req.request.method).toEqual('GET');
      req.flush(mock);
  });

  it('should call getOwnedGames and throw error', () => {
    const err = new Error();
    const spy = spyOn(service, 'getOwnedGames').and.returnValue(throwError(() => err));
    service.getOwnedGames('');

    expect(spy).toHaveBeenCalled();
  });

  it('should call getSteamLevel', ()=> {
    const spy = spyOn(service, 'getSteamLevel');
    service.getSteamLevel('');
    expect(spy).toHaveBeenCalled();
  });

  it('should call getSteamLevel and get steam level', () => {
    const mock = mockPlayer;
    service.getSteamLevel('76561198208029088')
      .subscribe(data => {
        expect(data).toEqual([{
          player_level: '10'
        }]);
      });

      const req = httpTestingController.expectOne(
        'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=C9B41CE7B9546971E28730F94BE6552B&steamid=76561198208029088'
        );
      expect(req.request.method).toEqual('GET');
      req.flush(mock);
  });

  it('should call getSteamLevel and throw error', () => {
    const err = new Error();
    const spy = spyOn(service, 'getSteamLevel').and.returnValue(throwError(() => err));
    service.getSteamLevel('');

    expect(spy).toHaveBeenCalled();
  });

  it('should call getFriends', ()=> {
    const spy = spyOn(service, 'getFriends');
    service.getFriends('');
    expect(spy).toHaveBeenCalled();
  });

  it('should call getFriends and get friend list', () => {
    const mock = mockFriendList;
    service.getFriends('76561198208029088')
      .subscribe(data => {
        expect(data).toEqual([{ 
          steamid: '76561197985158382', 
          relationship: 'friend', 
          friend_since:'1539033802' 
        }]);
      });

      const req = httpTestingController.expectOne(
        'https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=C9B41CE7B9546971E28730F94BE6552B&steamid=76561198208029088'
        );
      expect(req.request.method).toEqual('GET');
      req.flush(mock);
  });

  it('should call getFriends and throw error', () => {
    const err = new Error();
    const spy = spyOn(service, 'getFriends').and.returnValue(throwError(() => err));
    service.getFriends('');

    expect(spy).toHaveBeenCalled();
  });

  it('should call getPlayersOnlineByGame', ()=> {
    const spy = spyOn(service, 'getPlayersOnlineByGame');
    service.getPlayersOnlineByGame('');
    expect(spy).toHaveBeenCalled();
  });

  it('should call getPlayersOnlineByGame and get players online for each game', () => {
    const mock = [{
      player_count:'53346',
      result: '1'
    }];
    service.getPlayersOnlineByGame('105600')
      .subscribe(data => {
        expect(data).toEqual([{
          player_count:'53346',
          result:'1'
        }]);
      });
      const req = httpTestingController.expectOne(
        'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=C9B41CE7B9546971E28730F94BE6552B&appid=105600'
        );
      expect(req.request.method).toEqual('GET');
      req.flush(mock);
  });

  it('should call getPlayersOnlineByGame and throw error', () => {
    const err = new Error();
    const spy = spyOn(service, 'getPlayersOnlineByGame').and.returnValue(throwError(() => err));
    service.getPlayersOnlineByGame('');

    expect(spy).toHaveBeenCalled();
  });

  it('shoud call getAchievements', ()=> {
    const spy = spyOn(service, 'getAchievements');
    service.getAchievements('', '');
    expect(spy).toHaveBeenCalled();
  });

  it('should call getAchievements and get players online for each game', () => {
    const mock = mockAchievements;
    service.getAchievements('76561198208029088','105600')
      .subscribe(data => {
        expect(data).toEqual([{
          steamID:"76561198208029088",
          gameName:"Terraria",
          achievements:[
            {
            name:"TIMBER",
            achieved:1
            },
            {
              name:"NO_HOBO",
              achieved:1
            }]
        }]);
      });
      const req = httpTestingController.expectOne(
        'https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=C9B41CE7B9546971E28730F94BE6552B&steamid=76561198208029088&appid=105600'
        );
      expect(req.request.method).toEqual('GET');
      req.flush(mock);
  });

  it('should call getAchievements and throw error', () => {
    const err = new Error();
    const spy = spyOn(service, 'getAchievements').and.returnValue(throwError(() => err));
    service.getAchievements('','');

    expect(spy).toHaveBeenCalled();
  });
});