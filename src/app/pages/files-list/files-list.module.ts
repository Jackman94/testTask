import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesListRoutingModule } from './files-list-routing.module';
import { FilesListComponent } from './files-list.component';
import { UploadFilesModule } from "../upload-files/upload-files.module";


@NgModule({
  declarations: [
    FilesListComponent
  ],
  imports: [
    CommonModule,
    FilesListRoutingModule,
    UploadFilesModule
  ],
  providers: []
})
export class FilesListModule { }
