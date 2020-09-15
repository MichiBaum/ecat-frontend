import {ReturnPromotionImageDto} from "./return-promotion-image-dto";

export class Promotion {
  id: number;
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  returnPromotionImageDtos: ReturnPromotionImageDto[];

  constructor(
    id: number = 0,
    title: string = '',
    description: string = '',
    startDate: number = Date.now(),
    endDate: number = Date.now(),
    returnPromotionImageDtos: ReturnPromotionImageDto[] = []
  )
  {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.returnPromotionImageDtos = returnPromotionImageDtos;
  }
}
