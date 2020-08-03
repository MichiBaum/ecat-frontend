import {CustomUploadItem} from "./custom-upload-item";

export interface ProductImage extends CustomUploadItem{
  id: number;
  index: number;
  file: any;
  productId: number;
  imageName: string;
  mimeType?: string;
}
