import {CustomUploadItem} from "./custom-upload-item";

export interface ReturnPromotionImageDto extends CustomUploadItem {
  id: number;
  fileName: string;
  index: number;
  url: string;
}
