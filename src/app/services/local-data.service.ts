import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';

import { MovieDetail } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  movies: MovieDetail[] = [];

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.init();
    this.loadFavorites();
   }

  async init() {
    await this.storage.create();
  }

  saveMovie(movie: MovieDetail) {

    const control = this.movies.find(mov => movie.id === mov.id);
    let message = '';

    if (!control) {
      this.movies.push(movie);
      message = 'Añadido a favoritos';
    } else {
      this.movies = this.movies.filter(mov => mov.id !== movie.id);
      message = 'Borrado de favoritos';
    }

    this.storage.set('movies', this.movies);
    this.presentToast(message);

    return !control;
  }

  async loadFavorites() {
    const movies = await this.storage.get('movies');
    this.movies = movies || [];
    return this.movies;
  }

  async movieControl(id) {
    await this.loadFavorites();

    const control = this.movies.find(mov => mov.id === id);

    return (control) ? true : false;
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }
}
