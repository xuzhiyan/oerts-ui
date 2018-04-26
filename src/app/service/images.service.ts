import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ImagesService {

  constructor(private http: Http) {

  }

  upLoadImages(formData: FormData) {
    return this.http.post('/oerts/images/upload', formData);
  }
}
