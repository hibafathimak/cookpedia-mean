import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipies',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './saved-recipies.component.html',
  styleUrl: './saved-recipies.component.css'
})
export class SavedRecipiesComponent {

  savedRecipes:any=[]

  ngOnInit(){
    this.getSavedRecipe()
  }
  
  constructor(private api:ApiService){}

  getSavedRecipe(){
    this.api.getSavedRecipeApi().subscribe((res:any)=>{
      this.savedRecipes= res
      console.log(this.savedRecipes);     
    })   
  }

  deleteSavedRecipe(recipeId:string){
    this.api.deleteRecipeApi(recipeId).subscribe((res:any)=>{
      this.getSavedRecipe()
    })
  }
}
