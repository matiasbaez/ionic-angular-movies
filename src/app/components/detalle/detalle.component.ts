import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { LocalDataService } from '../../services/local-data.service';
import { MovieDetail, Cast } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  movie: MovieDetail = {};
  actors: Cast[] = [];
  characters = 150;
  slideActorsOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };
  favoriteIcon = 'star-outline';

  constructor(
    private moviesService: MoviesService,
    private localData: LocalDataService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.localData.movieControl(this.id)
    .then(control => this.favoriteIcon = (control) ? 'star' : 'star-outline');

    this.moviesService.getMovieDetails(this.id).subscribe(res => {
      this.movie = res;
    });

    this.moviesService.getMovieActors(this.id).subscribe(res => {
      this.actors = res.cast;
    });
  }

  back() {
    this.modalCtrl.dismiss();
  }

  favorite() {
    const control = this.localData.saveMovie(this.movie);
    this.favoriteIcon = (control) ? 'star' : 'star-outline';
  }

}
