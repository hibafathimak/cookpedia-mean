import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // serverUrl:string = "http://localhost:3000"
  serverUrl:string = "https://cookpediaserver-1.onrender.com"

  constructor(private http:HttpClient) { }
  getAllRecipes(){
    return this.http.get(`${this.serverUrl}/all-recipies`)
  }
  addTestimony(reqBody:any){
    return this.http.post(`${this.serverUrl}/add-testimony`,reqBody)
  }
  registerUser(reqBody:any){
    return this.http.post(`${this.serverUrl}/register`,reqBody)
  }
  loginApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/login`,reqBody)
  }
  appendToken(){
    let headers = new HttpHeaders()
    const token =sessionStorage.getItem("token")
    if(token){
      headers=headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }
  getSingleRecipeApi(recipeId:string){
    return this.http.get(`${this.serverUrl}/recipie/${recipeId}/view`,this.appendToken())
  }
  relatedRecipeApi(cuisine:string){
    return this.http.get(`${this.serverUrl}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }
  downloadRecipeApi(RecipeId:string,reqBody:any){
    return this.http.post(`${this.serverUrl}/recipe/${RecipeId}/download`,reqBody,this.appendToken())
  }
  saveRecipeApi(RecipeId:string,reqBody:any){
    return this.http.post(`${this.serverUrl}/recipe/${RecipeId}/save`,reqBody,this.appendToken())
  }
  getSavedRecipeApi(){
    return this.http.get(`${this.serverUrl}/saved-recipe`,this.appendToken())
  }
  deleteRecipeApi(recipeId:string){
    return this.http.delete(`${this.serverUrl}/saved-recipe/${recipeId}/delete`,this.appendToken())
  }
  getUserDownloadListApi(){
    return this.http.get(`${this.serverUrl}/download-recipes`,this.appendToken())
  }
  editUserApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/user-edit`,reqBody,this.appendToken())
  }
  getAllUsersApi(){
    return this.http.get(`${this.serverUrl}/all-users`,this.appendToken())
  }
  getAllDownloadsApi(){
    return this.http.get(`${this.serverUrl}/all-downloads`,this.appendToken())
  }
  getAllTestimonyApi(){
    return this.http.get(`${this.serverUrl}/all-testimony`,this.appendToken())
  }
  updateFeedbackApi(feedbackId:string,status:string){
    return this.http.get(`${this.serverUrl}/testimony/${feedbackId}/update?status=${status}`,this.appendToken())
  }
  getApprovedFeedbackApi(){
    return this.http.get(`${this.serverUrl}/feedbacks`)
  }
  addrecipeApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/add-recipe`,reqBody,this.appendToken())
  }
  editRecipeApi(reqBody:any,id:string){
    return this.http.put(`${this.serverUrl}/edit-recipe/${id}`,reqBody,this.appendToken()) 
  }
  deleteAdminRecipeApi(id:string){
    return this.http.delete(`${this.serverUrl}/delete-recipe/${id}`,this.appendToken()) 
  }

  getChartData(){
    this.getAllDownloadsApi().subscribe((res:any)=>{
      let downloadArrayList:any=[]
      let output:any={}
      res.forEach((item:any) => {
        let cuisine = item.recipeCuisine
        let currentCount =item.count
        if(output.hasOwnProperty(cuisine)){
          output[cuisine]+=currentCount
        }else{
          output[cuisine]=currentCount
        }
      });
      console.log(output);
      for(let cuisine in output){
        downloadArrayList.push({name:cuisine,y:output[cuisine]})
      }
      console.log(downloadArrayList);
      localStorage.setItem("chart",JSON.stringify(downloadArrayList))
    })
  }
}
