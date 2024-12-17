import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipes',
  templateUrl: './manage-recipes.component.html',
  styleUrl: './manage-recipes.component.css'
})
export class ManageRecipesComponent {
  @Input() id !:string
  recipeDetails: RecipeModel = {}
  allCuisine: any = []
  mealTypes: any = []
  ingredients: any = []
  instructions: any = []
  mealArray: any = []


  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getallReipes()
  }

  addIngredients(input: any) {

    if (input.value) {
      this.ingredients.push(input.value)
      this.recipeDetails.ingredients = this.ingredients
      input.value = ""
    }

  }

  addInstructions(input: any) {
    if (input.value) {
      this.instructions.push(input.value)
      this.recipeDetails.instructions = this.instructions
      input.value = ""
    }

  }

  getallReipes() {
    this.api.getAllRecipes().subscribe((res: any) => {

      if(this.id){
        this.recipeDetails=res.find((item:any)=>item._id==this.id)
        this.ingredients=this.recipeDetails.ingredients
        this.instructions=this.recipeDetails.instructions
        this.mealArray=this.recipeDetails.mealType
      }

      res.forEach((item: any) => {
        !this.allCuisine.includes(item.cuisine) && this.allCuisine.push(item.cuisine)
      });
      const dummyarray = res.flatMap((item: any) => item.mealType)
      dummyarray.forEach((item: any) => {
        !this.mealTypes.includes(item) && this.mealTypes.push(item)
      });

      console.log(this.allCuisine, this.mealTypes);
    })
  }

  removeIngredients(value: string) {
    this.ingredients = this.ingredients.filter((item: string) => item != value)
  }

  removeInstruction(value: string) {
    this.instructions = this.instructions.filter((item: string) => item != value)
  }

  selectMealType(event: any) {
    if (event.target.checked) {
     !this.mealArray.includes(event.target.name) && this.mealArray.push(event.target.name)
    } else {
      this.mealArray = this.mealArray.filter((item: String) => item != event.target.name)
    }
  }

  removeMealtype(meal:string){
    this.mealArray = this.mealArray.filter((item: String) => item != meal)
  }

  addRecipe(){
    console.log(this.recipeDetails);
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealArray
    const{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails
    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine &&
      caloriesPerServing && image && mealType!.length>0){

        this.api.addrecipeApi(this.recipeDetails).subscribe({
          next:(res:any)=>{
            alert("Recipe successfully added to our collection")
            this.recipeDetails ={}
            this.ingredients = []
            this.instructions = []
            this.mealArray = []
            this.router.navigateByUrl("/admin/recipe-list")
          }
        })

        error:(reason:any)=>{
          alert(reason.error)
          this.recipeDetails.name = ""
        }
      }else{
        alert("please fill the form completely")
      }  
  }
  editRecipe(){
    console.log(this.recipeDetails);
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealArray
    const{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails
    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine &&
      caloriesPerServing && image && mealType!.length>0){

        this.api.editRecipeApi(this.recipeDetails,this.id).subscribe((res:any)=>{
            alert(res)
            this.recipeDetails ={}
            this.ingredients = []
            this.instructions = []
            this.mealArray = []
            this.router.navigateByUrl("/admin/recipe-list")
          })
    
      }else{
        alert("please fill the form completely")
      }   
  }

}
