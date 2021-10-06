import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadFilesService} from "./upload-files.service";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  filesForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl(''),
    fileName: new FormControl('')
  });
  selectFiles: any = [];

  constructor(private uploadService: UploadFilesService, private dom: DomSanitizer) {
  }

  ngOnInit(): void {
    this.uploadService.getPreloadFiles().subscribe((fileList: any[]) => {
      this.selectFiles = fileList;

      //auto Upload method 1
      let counter = 0;
      const recursiveSend = () => {
        if (counter >= fileList.length) {
          return;
        } else {
            this.uploadService.convertFilesAndSave(fileList[counter])
              .subscribe((res: Observable<any>) => {
                res.subscribe((status) => {
                  this.selectFiles[counter].state = 'COMPLETED';
                  counter++;
                  recursiveSend();
              })
            });
        }
      };
      recursiveSend();

      //auto Upload method 2
      // fileList.forEach((file: any, i: number) => {
      //   this.uploadService.alternativeUploadFile(file).subscribe((res: any) => {
      //     this.selectFiles[i].path = res.blobFile;
      //   })
      // });

    })
  }

  submitForm(): void {
    if (this.selectFiles[0].path || this.selectFiles[0].state || this.selectFiles[0].currentFile) {
      this.selectFiles = [];
    }

    this.selectFiles.forEach((file: File) => {
      this.uploadService.setPreloadFiles(file).subscribe((res) => {
      })
    });

    this.uploadService.getPreloadFiles().subscribe((files) => {
      this.selectFiles = files;

      let counter = 0;
      const recursiveSend = () => {
        if (counter >= files.length) {
          return;
        } else {

          this.uploadService.convertFilesAndSave(files[counter])
            .subscribe((res: Observable<any>) => {
              res.subscribe((status) => {
                this.selectFiles[counter].state = 'COMPLETED';
                counter++;
                recursiveSend();
              })
            });
        }
      };
      recursiveSend();

    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const [...files] = event.target.files;
      this.selectFiles = files;
    }
  }
  transformlink(file: any) {
    return this.dom.bypassSecurityTrustUrl(file.path);
  }

  saveFiles(): void {
    if (this.selectFiles[0].path || this.selectFiles[0].state || this.selectFiles[0].currentFile) {
      this.selectFiles = [];
    }

    this.selectFiles.forEach((file: File) => {
      this.uploadService.setPreloadFiles(file).subscribe((res) => {
      })
    });

    this.uploadService.getPreloadFiles().subscribe((preFiles) => {
      this.selectFiles = preFiles;
      preFiles.forEach((file: any, i: number) => {
        this.uploadService.alternativeUploadFile(file).subscribe((res: any) => {
          this.selectFiles[i].path = res.blobFile;
        })
      });
    })
  }

}
