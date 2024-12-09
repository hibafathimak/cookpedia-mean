import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipies',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.css'
})
export class RecipiesComponent {
  allRecipes:any=[]
  dummyAllRecipies:any=[]
  allCuisine:any=[]
  mealTypes:any=[]
  searchKey:string=""
  p: number = 1;


  constructor(private api:ApiService,private router:Router){}

  ngOnInit(){
    this.getallReipes()
  }

  getallReipes(){
    this.api.getAllRecipes().subscribe((res:any)=>{
      this.allRecipes = res
      this.dummyAllRecipies=this.allRecipes
      console.log(this.allRecipes);
      this.allRecipes.forEach((item:any) => {
        !this.allCuisine.includes(item.cuisine) && this.allCuisine.push(item.cuisine)
      });
      
        const dummyarray =this.allRecipes.flatMap((item:any) => item.mealType)
        dummyarray.forEach((item:any) => {
          !this.mealTypes.includes(item) && this.mealTypes.push(item)
        });
        
        console.log();   
    })
  }

  filterAllRecipes(key:string,value:string){
    this.allRecipes=this.dummyAllRecipies.filter((item:any)=>item[key].includes(value))
  }

  viewRecipe(RecipeId:string){
    if(sessionStorage.getItem("token")){
      this.router.navigateByUrl(`/recipie/${RecipeId}/view`)
      
    }else{
      alert("Please Login to get full access to our Recipes Details!!!")
    }
  }

}
