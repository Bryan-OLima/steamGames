import { TestBed } from '@angular/core/testing';

import { GameService } from '../game-service.service';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

describe('GameService', () => {
  let service: GameService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService],
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(GameService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAll', ()=> {
    const spy = spyOn(service, 'getAll');
    service.getAll();
    expect(spy).toHaveBeenCalled();
  });

  it('should call getAll and get all games', ()=> {
    const mockGame = {
      appid: '123123',
      name: 'testname',
    }

    service.getAll()
      .subscribe((data: { appid: string; }) => {
        expect(data.appid).toEqual('123123');
      });

      const req = httpTestingController.expectOne('https://api.steampowered.com/ISteamApps/GetAppList/v2/');

      expect(req.request.method).toEqual('GET');
      req.flush(mockGame);
  });

  it('should call callGame and throw error', () => {
    const err = new Error();
    const spy = spyOn(service, 'getGame').and.returnValue(() => err);
    service.getGame(err);

    expect(spy).toHaveBeenCalled();
  });

  it('shoud call getGame', ()=> {
    const spy = spyOn(service, 'getGame');
    service.getGame(null);
    expect(spy).toHaveBeenCalled();
  });

  it('should call callGame and get one games', ()=> {
    const mockGame = {
      appid: '123123',
      name: 'testname',
    }

    service.getGame(mockGame.appid)
      .subscribe((data: { appid: string; }) => {
        expect(data.appid).toEqual('123123');
      });

      const req = httpTestingController.expectOne('https://api.steampowered.com/ICommunityService/GetApps/v1/?appids%5B0%5D=123123');

      expect(req.request.method).toEqual('GET');

      req.flush(mockGame);
  });

  it('should call callGame and throw error', () => {
    const err = new Error();
    const spy = spyOn(service, 'getGame').and.returnValue(() => err);
    service.getGame(err);

    expect(spy).toHaveBeenCalled();
  });
});