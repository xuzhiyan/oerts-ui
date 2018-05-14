import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()
export class ExamPlaceManagementService {

  header = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getAllExamPlace() {
    const url = '/oerts/examplace/all';
    return this.http.get(url);
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

  deleteExamPlace(body: any) {
    return this.http.post('/oerts/examplace/delete', body, {headers: this.header});
  }

  addExamPlace(body: any) {
    return this.http.post('/oerts/examplace/add', body, {headers: this.header});
  }
}
