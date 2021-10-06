import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadFilesRoutingModule } from './upload-files-routing.module';
import { UploadFilesComponent } from './upload-files.component';
import {DBConfig, NgxIndexedDBModule} from "ngx-indexed-db";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UploadFilesService } from "./upload-files.service";
import { NgxSpinnerModule } from "ngx-spinner";

const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'files',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: false } }
    ]
  },
  {
    store: 'preLoadedFiles',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'preLoadedFiles', keypath: 'preLoadedFiles', options: { unique: false } },
    ]
  },
    {
      store: 'blobFiles',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'blobFiles', keypath: 'blobFiles', options: { unique: false } },
      ]
    }
  ]
};

@NgModule({
  declarations: [
    UploadFilesComponent,
  ],
  imports: [
    CommonModule,
    UploadFilesRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [
    NgxIndexedDBModule
  ],
  providers: [UploadFilesService]
})
export class UploadFilesModule { }
