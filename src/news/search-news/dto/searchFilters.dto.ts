import { ApiPropertyOptional, OmitType, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { MonthNameType } from '../../../types/miscellanius.type';
import { monthNames } from '../../../utils/date.utils';
import { parseQueryNumber, RecursiveArray } from '../../../utils/utils';
import { transformSearchQueryTags } from '../transformers/searchQuery.transformer';

export class QueryFiltersDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional({ type: 'string' })
  @Transform(({ value }) => transformSearchQueryTags(value))
  @IsOptional()
  tags?: RecursiveArray<string>;

  @ApiPropertyOptional({ description: 'UNIX Timestamp' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'Must be a UNIX timestamp number' },
  )
  @IsOptional()
  min_date?: number; // Unix TimeStamp

  @ApiPropertyOptional({ description: 'UNIX Timestamp' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'Must be a UNIX timestamp number' },
  )
  @IsOptional()
  max_date?: number; // Unix TimeStamp

  @ApiPropertyOptional()
  @IsString()
  @Transform(({ value }) => (value as string).toLowerCase())
  @IsIn(monthNames)
  @IsOptional()
  month_word?: MonthNameType;

  @ApiPropertyOptional({ type: 'number' })
  @Transform(({ value }) => parseQueryNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  page = 1;

  @ApiPropertyOptional({ type: 'number' })
  @Transform(({ value }) =>
    parseQueryNumber(value, { default: 5, max: 5, min: 1 }),
  )
  @IsNumber()
  @IsOptional()
  items_per_page = 5;
}

export class VisibilityQueryFiltersDto extends OmitType(QueryFiltersDto, [
  'page',
  'items_per_page',
] as const) {}

export class ShowHiddenRecordsOptionsDto extends PickType(QueryFiltersDto, [
  'page',
  'items_per_page',
] as const) {}
