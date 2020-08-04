import {CustomUploadItem} from "./custom-upload-item";

export interface SaveProductImageDto extends CustomUploadItem{
  id: number;
  index: number;
  file: any;
  productId: number;
  fileName: string;
}
