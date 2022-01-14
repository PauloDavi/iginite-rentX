import { ICreateCarImageDto } from "../dtos/ICreateCarImageDto";
import { CarImage } from "../infra/typeorm/entities/CarImage";

export interface ICarsImagesRepository {
  create(data: ICreateCarImageDto): Promise<CarImage>;
}
