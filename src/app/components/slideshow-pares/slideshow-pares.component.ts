import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DetalleComponent } from '../detalle/detalle.component';

import { Movie } from '../../interfaces/interfaces';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Output() loadMore = new EventEmitter();

  slideOpts = {
    slidesPerView: 2.5,
    freeMode: true,
    spaceBetween: -10
  };

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  showMore() {
    this.loadMore.emit();
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
}
