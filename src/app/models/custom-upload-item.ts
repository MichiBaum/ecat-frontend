import {SafeUrl} from "@angular/platform-browser";

export interface CustomUploadItem {
  id: number;
  file?: File;
  index: number;
  fileName: string,
  url?: SafeUrl;

}
