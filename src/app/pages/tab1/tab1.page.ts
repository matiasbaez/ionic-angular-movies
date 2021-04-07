import { Component } from '@angular/core';

import { MoviesService } from 'src/app/services/movies.service';

import { Movie } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  recentMovies: Movie[] = [];
  popular: Movie[] = [];

  constructor(
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.moviesService.getFeature().subscribe(res => {
      this.recentMovies = res.results;
    });

    this.getPopular();
  }

  loadMore() {
    this.getPopular();
  }

  getPopular() {
    this.moviesService.getPopular().subscribe(res => {
      const temp = [...this.popular, ...res.results];
      this.popular = temp;
    });
  }

}
