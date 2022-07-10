import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { MonthNameType } from '../../../types/miscellanius.type';
import { monthNames } from '../../../utils/date.utils';
import { parseQueryNumber, RecursiveArray } from '../../../utils/utils';
import { transformSearchQueryTags } from '../transformers/searchQuery.transformer';

export class QueryFiltersDto {
  @IsString()
  @IsOptional()
  author?: string;

  @Transform(({ value }) => transformSearchQueryTags(value))
  @IsOptional()
  tags?: RecursiveArray<string>;

  @Transform(({ value }) => parseInt(value))
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'Must be a UNIX timestamp number' },
  )
  @IsOptional()
  min_date?: number; // Unix TimeStamp

  @Transform(({ value }) => parseInt(value))
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'Must be a UNIX timestamp number' },
  )
  @IsOptional()
  max_date?: number; // Unix TimeStamp

  @IsString()
  @Transform(({ value }) => (value as string).toLowerCase())
  @IsIn(monthNames)
  @IsOptional()
  month_word?: MonthNameType;

  @Transform(({ value }) => parseQueryNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  page = 1;

  @Transform(({ value }) =>
    parseQueryNumber(value, { default: 5, max: 5, min: 1 }),
  )
  @IsNumber()
  @IsOptional()
  itemsPerPage = 5;
}
