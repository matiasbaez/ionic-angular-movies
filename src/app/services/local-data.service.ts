import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { MovieDetail } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  movies: MovieDetail[] = [];

  constructor(
    private storage: NativeStorage,
    private toastCtrl: ToastController
  ) {
    this.loadFavorites();
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

    this.storage.setItem('movies', this.movies);
    this.presentToast(message);

    return !control;
  }

  async loadFavorites() {
    const movies = await this.storage.getItem('movies');
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
