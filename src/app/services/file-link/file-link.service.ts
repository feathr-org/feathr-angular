import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { FileLink } from 'src/app/models/file-link.model';

@Injectable({
  providedIn: 'root',
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

  async getFileLink(id: string): Promise<FileLink> {
    return new Promise((resolve, reject) => {
      this.httpClient.get<FileLink>(this.baseUrl + 'filelink/' + id).subscribe(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async createFileLink(uri: string): Promise<FileLink> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('uri', uri);

    return new Promise((resolve, reject) => {
      this.httpClient
        .post<FileLink>(this.baseUrl + 'filelink', null, { params: httpParams })
        .subscribe(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
}
