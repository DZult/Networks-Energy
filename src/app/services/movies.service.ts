import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  URL = "http://www.omdbapi.com/"
  API_KEY = "apikey=d70417e1";
  MOVIE_ID = "i=tt3896198"
  TYPE_MOVIE = "type=movie"
  TYPE_SERIES = "type=series"
  SEARCH = "s=avenger"

  constructor(private http: HttpClient) { }

  public getMoviesList = (page = 1) => {
    return this.http.get<any>(`${this.URL}?${this.API_KEY}&${this.TYPE_MOVIE}&${this.MOVIE_ID}&${this.SEARCH}&page=${page}`)
  }

  public getSeriesList = (page = 1) => {
    return this.http.get<any>(`${this.URL}?${this.API_KEY}&${this.TYPE_SERIES}&${this.MOVIE_ID}&${this.SEARCH}&page=${page}`)
  }
}
