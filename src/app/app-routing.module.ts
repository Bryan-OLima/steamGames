import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './public/game/game-list/game-list.component';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { NotFoundComponent } from './public/not-found/not-found.component';

const routes: Routes = [
{
  path:'',
  component: HomeComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'gamelist',
  component: GameListComponent
},
{
  path: '**',
  component: NotFoundComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
