import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ExamPlaceManagementService {

  constructor(private http: Http) {
  }

  getAllCity() {
    const url = '/oerts/examplace/city/all';
    return this.http.get(url);
  }

  getDistrictByCity(city: string) {
    const url = '/oerts/examplace/district/' + city;
    return this.http.get(url);
  }

  getPlaceByDistrict(district: string) {
    const url = '/oerts/examplace/palce/' + district;
    return this.http.get(url);
  }
}
