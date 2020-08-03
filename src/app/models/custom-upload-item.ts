import {SafeUrl} from "@angular/platform-browser";

export interface CustomUploadItem {
  id: number;
  file: any;
  index: number;
  url?: SafeUrl;

}
