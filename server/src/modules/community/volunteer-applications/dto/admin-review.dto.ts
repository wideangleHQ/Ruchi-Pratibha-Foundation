import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class AdminReviewDto {
  @ApiPropertyOptional({ example: 'Candidate has strong leadership skills.' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  adminRemarks?: string;
}
