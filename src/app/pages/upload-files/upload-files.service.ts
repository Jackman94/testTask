import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from "ngx-indexed-db";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";


export interface filesData {
  file: any;
  fileName: {
    value: string[]
  };
  fileSource: {
    value: File[]
  };
}

@Injectable({
  providedIn: 'root'
})

export class UploadFilesService {

  constructor(private dbService: NgxIndexedDBService) { }

  convertFilesAndSave(file: any): any {
    let fileReader = new FileReader();
    let convertFile: any = null;
    fileReader.readAsDataURL(file.currentFile);

    return new Observable((subscriber) => {
      fileReader.onloadend = () => {
        convertFile = fileReader.result;
        subscriber.next(
          this.dbService.addItem('files', {
            convertFile
          }).pipe(
            map((res) => {
              this.dbService.deleteByKey('preLoadedFiles', file.id)
                .subscribe((res) => res)
              return res
            }))
        )
      }
    })
  }

  setPreloadFiles(currentFile: any): Observable<any> {
    return this.dbService.addItem('preLoadedFiles', {
      currentFile,
    })
  }

  getPreloadFiles(): Observable<any> {
   return this.dbService.getAll('preLoadedFiles');
  }

  getFiles(): Observable<any> {
    return this.dbService.getAll('files');
  }

  getLinkFiles(): Observable<any> {
    return this.dbService.getAll('blobFiles');
  }

  alternativeUploadFile(file: any): Observable<any> {
    const blobFile = URL.createObjectURL(file.currentFile);
    return this.dbService.addItem('blobFiles', {blobFile}).pipe(
      map((res) => {
        this.dbService.deleteByKey('preLoadedFiles', file.id).subscribe((t)=> {});
        return res;
      })
    );
  }
}
