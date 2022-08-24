import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MoviesService} from "../../services/movies.service";
import {SwiperComponent} from "swiper/angular";
import {SwiperOptions} from 'swiper';
import {Subscription} from "rxjs";

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
export class ContentComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];
  public moviesList: Movie[] = [];
  public fullMoviesList: Movie[] = [];
  public swiperPages: number[] = [1, 2, 3, 4];
  public pagination: any;
  public currentPage = 1;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    allowTouchMove: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    navigation: true
  };
  public filters: string[] = ['Все', 'Экшен', 'Фантастика', 'Приключения', 'Анимация', 'Биография', 'Комедии', 'Драма']

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    const s = this.moviesService.getMoviesList().subscribe(res => {
      this.moviesList = res.Search.map((item: Preload) => {
        return {
          title: item.Title,
          year: item.Year,
          type: item.Type,
          imdbID: item.imdbID,
          poster: item.Poster,
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut nemo neque sapiente. Doloremque enim eveniet necessitatibus, quam repellendus sed ullam?",
        }
      });
    })
    this.subscriptions.push(s);

    const ss = this.moviesService.getMoviesList().subscribe(res => {
      this.fullMoviesList = res.Search.map((item: Preload) => {
        return {
          title: item.Title,
          year: item.Year,
          type: item.Type,
          imdbID: item.imdbID,
          poster: item.Poster,
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut nemo neque sapiente. Doloremque enim eveniet necessitatibus, quam repellendus sed ullam?",
        }
      });
      this.pagination = Array(this.fullMoviesList.length % 4 === 1 ? this.fullMoviesList.length % 4 : (this.fullMoviesList.length % 4) + 1).fill(1);
    })
    this.subscriptions.push(ss);

    setTimeout(() => {
      console.log(this.pagination)
    }, 3000)
  }

  public swipePrev = () => {
    if (this.swiper) {
      this.swiper.swiperRef.slidePrev();
    }
  }

  public swipeNext = () => {
    if (this.swiper) {
      this.swiper.swiperRef.slideNext();
    }
  }

  public onSlideChange = (event: any) => {
    const s = document.querySelector('.counterCustom') as HTMLElement;
    s.innerHTML = (event[0].realIndex + 1) + '/6';
  }

  public toggle = (event: any) => {
    event.preventDefault();
    event.target.classList.toggle('active');
  }

  public onPaginate = (page: number = 1) => {
    this.currentPage = page;
    const s = this.moviesService.getMoviesList(page).subscribe(res => {
      this.fullMoviesList = res.Search.map((item: Preload) => {
        return {
          title: item.Title,
          year: item.Year,
          type: item.Type,
          imdbID: item.imdbID,
          poster: item.Poster,
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut nemo neque sapiente. Doloremque enim eveniet necessitatibus, quam repellendus sed ullam?",
        }
      });
    });
    this.subscriptions.push(s);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
