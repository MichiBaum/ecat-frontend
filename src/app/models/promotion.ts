import {ReturnPromotionImageDto} from "./return-promotion-image-dto";

export interface Promotion {
  id: number;
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  returnPromotionImageDtos?: ReturnPromotionImageDto[];
}
