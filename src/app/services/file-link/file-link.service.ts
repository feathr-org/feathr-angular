import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';
import { FileLink } from 'src/app/models/file-link.model';

@Injectable({
  providedIn: 'root'
})
export class FileLinkService {
  baseUrl?: string;

  constructor(private httpClient: HttpClient) {
    if (isDevMode()) {
      this.baseUrl = 'http://localhost:5000/api/';
    } else {
      this.baseUrl = 'https://feathr.org/api/';
    }
  }

  getFileLink(id: string, callback: (result: FileLink) => void) {
    this.httpClient.get<FileLink>(this.baseUrl + 'filelink/' + id).subscribe(
      (result) => {
        callback(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createFileLink(uri: string, callback: (result: FileLink) => void) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('uri', uri);

    this.httpClient.post<FileLink>(this.baseUrl + 'filelink', null, { params: httpParams }).subscribe(
      (result) => {
        callback(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
