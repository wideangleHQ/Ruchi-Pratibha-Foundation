import { ApiPropertyOptional } from '@nestjs/swagger';
import { OpportunityMode, OpportunityStatus, OpportunityType } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationQueryDto } from '../../../../common/dto/pagination-query.dto';

export class OpportunityQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: OpportunityStatus })
  @IsOptional()
  @IsEnum(OpportunityStatus)
  opportunityStatus?: OpportunityStatus;

  @ApiPropertyOptional({ enum: OpportunityType })
  @IsOptional()
  @IsEnum(OpportunityType)
  opportunityType?: OpportunityType;

  @ApiPropertyOptional({ enum: OpportunityMode })
  @IsOptional()
  @IsEnum(OpportunityMode)
  mode?: OpportunityMode;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  district?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;
}
