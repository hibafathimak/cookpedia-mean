import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent {
allRecipes:any=[]
searchKey:string=""
constructor(private api:ApiService){}
ngOnInit(){
  this.getallrecipe()
}
getallrecipe(){
  this.api.getAllRecipes().subscribe((res:any)=>{
    this.allRecipes=res
  })
}
deleteRecipe(id:string){
  console.log(id);
  
  this.api.deleteAdminRecipeApi(id).subscribe((res:any)=>{
    alert(res)
    this.getallrecipe()
  })
}
}
