import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MDBResponse, MovieDetail, CreditsResponse, Genre } from '../interfaces/interfaces';

import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularPage = 0;
  genres: Genre[] = [];
  page = 0;
  currentSearch = '';

  constructor(
    private http: HttpClient
  ) { }

  private makePetition<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;

    return this.http.get<T>(query);
  }

  getFeature() {
    const today = new Date();
    const lastDay = new Date( today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const month = today.getMonth() + 1;

    let monthstr;

    if (month < 10) {
      monthstr = '0' + month;
    } else {
      monthstr = month;
    }

    const start = `${today.getFullYear()}-${monthstr}-01`;
    const end = `${today.getFullYear()}-${monthstr}-${lastDay}`;

    return this.makePetition<MDBResponse>(`/discover/movie?primary_release_date.gte=${start}&primary_release_date.lte=${end}`);
  }

  getPopular() {
    this.popularPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularPage}`;
    return this.makePetition<MDBResponse>(query);
  }

  getMovieDetails(id) {
    return this.makePetition<MovieDetail>(`/movie/${id}?a=1`);
  }

  getMovieActors(id) {
    return this.makePetition<CreditsResponse>(`/movie/${id}/credits?a=1`);
  }

  searchMovie(text: string) {
    if (this.currentSearch === text) {
      this.page++;
    } else {
      this.page = 1;
      this.currentSearch = text;
    }

    return this.makePetition<MDBResponse>(`/search/movie?query=${text}&page=${this.page}`);
  }

  loadGenres(): Promise<Genre[]> {
    return new Promise( resolve => {
      this.makePetition(`/genre/movie/list?a=1`)
      .subscribe( res => {
        this.genres = res['genres'];
        resolve(this.genres);
      });
    });
  }
}
