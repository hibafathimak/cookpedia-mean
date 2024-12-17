import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { ManageRecipesComponent } from './manage-recipes/manage-recipes.component';

const routes: Routes = [
  {path:'' , component:DashboardComponent,title:"Admin Dashboard"},
  {path:'download-list' , component:DownloadListComponent,title:"Recipe Download List"},
  {path:'recipe-list' , component:RecipesListComponent,title:"Recipes List"},
  {path:'user-list' , component:UsersListComponent,title:"Users List"},
  {path:'request-list' , component:RequestsListComponent,title:"Client Request List"},
  {path:'recipe/add' , component:ManageRecipesComponent,title:"Add Recipe Page"},
  {path:'recipe/:id/edit' , component:ManageRecipesComponent,title:"Edit Recipe Page"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
