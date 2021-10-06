import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from "../upload-files/upload-files.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements OnInit {
  fileList: any[] = [];
  fileLinks: any[] = [];
  constructor(private uploadService: UploadFilesService, private dom: DomSanitizer) { }

  ngOnInit(): void {
    this.uploadService.getFiles().subscribe((files: any) => {
      if (files.length) {
        for (let i = 0; i < 5; i++) {
          this.fileList.push(files[i]);
        }
      }
    });
    this.uploadService.getLinkFiles().subscribe((files) => {
      if (files.length) {
        for (let i = 0; i < files.length && i < 5; i++) {
          this.fileLinks.push(files[i]);
        }
      }
    })
  }
  transformlink(file: any) {
    return this.dom.bypassSecurityTrustUrl(file);
  }

}
