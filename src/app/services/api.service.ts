import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverUrl:string = "http://localhost:3000"
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
}
