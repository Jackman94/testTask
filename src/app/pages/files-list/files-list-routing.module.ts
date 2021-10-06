import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesListComponent } from './files-list.component';

const routes: Routes = [{ path: '', component: FilesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesListRoutingModule { }
