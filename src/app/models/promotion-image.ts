import {CustomUploadItem} from "./custom-upload-item";

export interface PromotionImage extends CustomUploadItem{
  id: number;
  index: number;
  file: any;
  promotionId: number;
  imageName: string;
  mimeType?: string;
}
