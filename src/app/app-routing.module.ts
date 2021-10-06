import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import ('../app/pages/upload-files/upload-files.module').then(m => m.UploadFilesModule)},
  { path: 'filesList', loadChildren: () => import('./pages/files-list/files-list.module').then(m => m.FilesListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
