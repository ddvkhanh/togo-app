import { Injectable } from '@angular/core';
import { TogoPlace } from 'src/public/models/togo.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_URL = './api/togo';

@Injectable({
  providedIn: 'root',
})
export class DataSource {
  private places: TogoPlace[] = new Array<TogoPlace>();

  constructor(private http: HttpClient) {}

  get(): Observable<TogoPlace[]> {
    return this.sendRequest<TogoPlace[]>('GET', API_URL).pipe(catchError((err) => {throw 'Error in getting place list: ' +err}));
  }

  getPlace(id: string): Observable<TogoPlace> {
    return this.sendRequest<TogoPlace>('GET', `./api/togo/${id}`).pipe(catchError((err) => {throw 'Error in getting place by id: ' +err}));
  }

  savePlace(place: TogoPlace): Observable<TogoPlace> {
    return this.sendRequest<TogoPlace>('POST', API_URL, place).pipe(catchError((err) => {throw 'Error in saving place: ' +err}));
  }

  updatePlace(id: string, params: TogoPlace): Observable<TogoPlace> {
    return this.sendRequest<TogoPlace>('PUT', `${API_URL}/${id}`, params);
  }

  deletePlace(id: any): Observable<TogoPlace> {
    return this.sendRequest<TogoPlace>('DELETE', `${API_URL}/${id}`).pipe(catchError((err) => {throw 'Error in deleting place: ' +err}));
  }

  private sendRequest<T>(
    verb: string,
    url: string,
    body?: TogoPlace
  ): Observable<T> {
    return this.http.request<T>(verb, url, {
      body: body,
    });
  }
}
