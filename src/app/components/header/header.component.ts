import {Component, OnDestroy, OnInit} from '@angular/core';
import {MoviesService} from "../../services/movies.service";
import {Subscription} from "rxjs";

interface Category {
 name: string;
 list?: CategoryItem[];
}

interface CategoryItem {
  title: string;
  year?: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];
  public page: number = 1;

  public categories: Category[] = [
    {
      name: 'Фильмы 2022',
    },
    {
      name: 'Сериалы 2022',
    },
    {
      name: 'Мультфильмы',
    },
    {
      name: 'ТОП 250',
    },
    {
      name: 'Скоро в кино',
    }
  ]

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    const movies = this.moviesService.getMoviesList(this.page).subscribe(res => {
      this.categories[0].list = res.Search.map((item: { Title: any; Year: any; }) => {
        return {
          title: item.Title,
          year: item.Year
        }
      })
    })
    this.subscriptions.push(movies);

    const series = this.moviesService.getSeriesList(this.page).subscribe(res => {
      this.categories[1].list = res.Search.map((item: { Title: any; Year: any; }) => {
        return {
          title: item.Title,
          year: item.Year
        }
      })
    })
    this.subscriptions.push(series);
  }

  public toggle = (event: any) => {
    event.preventDefault();
    event.target.classList.toggle('expanded');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
