import {CustomUploadItem} from "./custom-upload-item";

export interface SavePromotionImageDto extends CustomUploadItem{
  id: number;
  index: number;
  file: any;
  promotionId: number;
  fileName: string;
}
