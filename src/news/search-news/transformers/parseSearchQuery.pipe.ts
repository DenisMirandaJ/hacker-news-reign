import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { RawSearchFiltersDto } from '../dto/searchFilters.dto';

@Injectable()
export class ParseSearchQuery
  implements PipeTransform<RawSearchFiltersDto, >
{
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
