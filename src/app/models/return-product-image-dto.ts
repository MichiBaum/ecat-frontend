import {CustomUploadItem} from "./custom-upload-item";

export interface ReturnProductImageDto extends CustomUploadItem{
  id: number;
  fileName: string;
  index: number;
  url: string;

}
