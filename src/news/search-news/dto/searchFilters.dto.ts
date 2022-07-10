export class RawSearchFiltersDto {
  author?: string;
  tags?: string;
  min_date?: string;
  max_date?: string;
  month_word?:
    | 'january'
    | 'february'
    | 'march'
    | 'april'
    | 'may'
    | 'june'
    | 'july'
    | 'august'
    | 'september'
    | 'october'
    | 'november'
    | 'december';
}

export class TrasnformedSearchFiltersDto {
  author?: string;
  tags?: string;
  min_date?: string;
  max_date?: string;
  month_word?:
    | 'january'
    | 'february'
    | 'march'
    | 'april'
    | 'may'
    | 'june'
    | 'july'
    | 'august'
    | 'september'
    | 'october'
    | 'november'
    | 'december';
}
