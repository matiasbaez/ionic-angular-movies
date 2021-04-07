import { Component } from '@angular/core';

import { LocalDataService } from 'src/app/services/local-data.service';
import { MoviesService } from 'src/app/services/movies.service';

import { Genre, MovieDetail } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  favorites: MovieDetail[] = [];
  genres: Genre[] = [];
  favoritesByGenre: any[] = [];

  constructor(
    private localData: LocalDataService,
    private moviesService: MoviesService,
  ) {

  }

  async ionViewWillEnter() {
    this.favorites = await this.localData.loadFavorites();
    this.genres = await this.moviesService.loadGenres();

    this.moviesByGenre(this.genres, this.favorites);
  }

  moviesByGenre(genres: Genre[], movies: MovieDetail[]) {
    this.favoritesByGenre = [];

    genres.forEach( genre => {
      this.favoritesByGenre.push({
        genre: genre,
        movies: movies.filter(movie => {
          return movie.genres.find(mov_genre => mov_genre.id === genre.id);
        })
      });
    });
  }

}
