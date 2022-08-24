import { Component, OnInit } from '@angular/core';
import {MoviesService} from "../../services/movies.service";

interface Preload {
  Title: string;
  Year: string;
  Type: string;
  imdbID: string;
  Poster: string;
}

interface Movie {
  title: string,
  year: string,
  type: string,
  imdbID: string,
  poster: string,
  description: string,
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public moviesList: Movie[] = [];
  public swiperPages: number[] = [1, 2, 3, 4];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getMoviesList().subscribe(res => {
      this.moviesList = res.Search.slice(0, 4).map((item: Preload) => {
        return {
          title: item.Title,
          year: item.Year,
          type: item.Type,
          imdbID: item.imdbID,
          poster: item.Poster,
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut nemo neque sapiente. Doloremque enim eveniet necessitatibus, quam repellendus sed ullam?",
        }
      });
      console.log(this.moviesList)
    })
  }

}
