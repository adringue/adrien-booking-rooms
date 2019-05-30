import {
  FormsModule
} from '@angular/forms';
import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  ImageUploadComponent
} from './image-upload.component';
import {
  ImageUploadService
} from './image-upload.service';
import { HttpModule } from '@angular/http';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ImageCropperModule,
  ],
  providers: [
    ImageUploadService
  ],
  exports: [
    ImageUploadComponent
  ],
  declarations: [
    ImageUploadComponent
  ]
})
export class ImageUploadModule {}
