import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DetalleComponent } from 'src/app/components/detalle/detalle.component';

import { MoviesService } from 'src/app/services/movies.service';

import { Movie } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  searchText = '';
  sugerencias = ['Avengers', 'Mortal Kombat', 'Ip Man'];
  movies: Movie[] = [];
  searching = false;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  search(event) {
    const value: string = (event.detail) ? event.detail.value : this.searchText;
    if (value.length === 0) {
      this.searching = false;
      this.movies = [];
      return;
    }

    this.searching = true;
    this.moviesService.searchMovie(value).subscribe(res => {
      this.movies.push(...res.results);
      this.searching = false;
    });
  }

  async seeDetails(id) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

  async loadData(event) {
    if (this.searchText === '') {
      event.target.complete();
      return;
    }

    await this.search(event);
    event.target.complete();
  }

}
