import { HttpClient } from '@angular/common/http';
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
}
