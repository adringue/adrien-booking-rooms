import { HttpClient } from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import 'rxjs/add/observable/of';
import {
  Response
} from '@angular/http';
@Injectable()
export class ImageUploadService {
  constructor(private http: HttpClient) { }
  public uploadImage(image: File): Observable<string | any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post('/api/v1/image-upload', formData).map((json: any) => json.imageUrl);
  }
}
