import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-view-recipie',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './view-recipie.component.html',
  styleUrl: './view-recipie.component.css'
})
export class ViewRecipieComponent {
  recipeId: string = ""
  recipe: any = {}

  allRelatedRecipes: any = []
  constructor(private route: ActivatedRoute, private api: ApiService) { }
  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      this.recipeId = res.id
      console.log(this.recipeId);
      this.getRecipeDetails(this.recipeId)
    })
  }
  getRecipeDetails(recipeId: string) {
    this.api.getSingleRecipeApi(recipeId).subscribe((res: any) => {
      this.recipe = res
      console.log(this.recipe);
      this.getRelatedRecipes(res.cuisine)
    })
  }
  getRelatedRecipes(cuisine: string) {
    this.api.relatedRecipeApi(cuisine).subscribe((res: any) => {
      if (res.length > 0) {
        this.allRelatedRecipes = res.filter((item: any) => item.name != this.recipe.name)
        console.log(this.allRelatedRecipes);
      } else {
        this.allRelatedRecipes = []
      }
    })
  }
  downloadRecipe(){
    this.api.downloadRecipeApi(this.recipeId,this.recipe).subscribe((res:any)=>{
      this.api.getChartData()
      this.generatePdf()
    })
  }
  saveRecipe(){
    this.api.saveRecipeApi(this.recipeId,this.recipe).subscribe({
      next:(res:any)=>{
        alert("Recipe Saved to The Collection")
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }
 
  generatePdf(){
    const pdf = new jsPDF()
    pdf.setFontSize(20)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name,10,10)
    pdf.setFontSize(14)
    pdf.setTextColor("black")
    pdf.text(`Cuisine : ${this.recipe.cuisine}`,10,20)
    pdf.text(`Servings : ${this.recipe.Servings}`,10,30)
    pdf.text(`Mode of Cooking : ${this.recipe.difficulty}`,10,40)
    pdf.text(`Total Preparation Time : ${this.recipe.prepTimeMinutes}`,10,50)
    pdf.text(`Total Cooking Time : ${this.recipe.cookTimeMinutes}`,10,60)
    pdf.text(`Total Calorie Per Servings : ${this.recipe.caloriesPerServing}`,10,70)
    let head =[['Ingredients','Cooking Instructions']]
    let body =[]
    body.push([this.recipe.ingredients,this.recipe.instructions])
    autoTable(pdf,{head,body,margin:{top: 80, right: 10, bottom: 0, left: 10}})
    pdf.output('dataurlnewwindow')
    pdf.save('download-recipe.pdf')
  } 
}

