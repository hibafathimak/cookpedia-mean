import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { SavedRecipiesComponent } from './saved-recipies/saved-recipies.component';
import { ViewRecipieComponent } from './view-recipie/view-recipie.component';
import { PnfComponent } from './pnf/pnf.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path:'admin',canActivate:[authGuard],loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
    },
    {
        path: "", component: HomeComponent,title:"Home Page"
    },
    {
        path: "about", component: AboutComponent,title:"About"
    },
    {
        path: "contact", component: ContactComponent,title:"Contact"
    },
    {
        path: "login", component: LoginComponent,title:"Login"
    },
    {
        path: "register", component: RegisterComponent,title:"Register"
    },
    {
        path: "profile",canActivate:[authGuard], component: ProfileComponent,title:"Profile Page"
    },
    {
        path: "all-recipies", component: RecipiesComponent,title:"All Recipies"
    },
    {
        path: "save-recipies",canActivate:[authGuard], component: SavedRecipiesComponent,title:"Saved Recipies Collection"
    },
    {
        path: "recipie/:id/view",canActivate:[authGuard], component: ViewRecipieComponent,title:"View Recipe"
    },
    {
        path: "**", component: PnfComponent,title:"Page Not Found"
    }
];
