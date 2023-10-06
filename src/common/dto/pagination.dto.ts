import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginadtionDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  offset?: number;
}
