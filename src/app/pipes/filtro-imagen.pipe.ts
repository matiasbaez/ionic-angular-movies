import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroImagen'
})
export class FiltroImagenPipe implements PipeTransform {

  transform(movies: any[]): any[] {
    return movies.filter(movie => {
      return movie.backdrop_path;
    });
  }

}
