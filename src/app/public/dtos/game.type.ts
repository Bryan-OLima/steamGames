export interface GameModel {
    appid: number;
    name: string;
}

export interface AppList {
    applist: Array<GameModel>
}

export interface GamesList {
    apps: Array<GameModel>
}


export interface GameModel2 {
    appid: string;
    name: string;
}