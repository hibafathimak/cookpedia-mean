import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-recipies',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.css'
})
export class RecipiesComponent {
  allRecipes:any=[]
  allCuisine:any=[]
  mealTypes:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getallReipes()
  }

  getallReipes(){
    this.api.getAllRecipes().subscribe((res:any)=>{
      this.allRecipes = res
      console.log(this.allRecipes);
      this.allRecipes.forEach((item:any) => {
        !this.allCuisine.includes(!item.cuisine) && this.allCuisine.push(item.cuisine)
      });
      
        const dummyarray =this.allRecipes.flatMap((item:any) => item.mealType)
        dummyarray.forEach((item:any) => {
          !this.mealTypes.includes(item) && this.mealTypes.push(item)
        });
        
        console.log();
        
    })
  }
}
