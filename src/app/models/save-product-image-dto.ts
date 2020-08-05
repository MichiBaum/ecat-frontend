import {CustomUploadItem} from "./custom-upload-item";

export interface SaveProductImageDto{
  id: number;
  index: number;
  file: any;
  productId: number;
  fileName: string;
}
