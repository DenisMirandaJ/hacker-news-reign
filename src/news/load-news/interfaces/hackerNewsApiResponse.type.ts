export interface HackerNewsResponse {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  query: string;
  params: string;
  processingTimeMS: number;
}

export interface Hit {
  created_at: string; //ISO String
  title?: string;
  url?: string;
  author: string;
  points?: number;
  story_text?: string;
  comment_text?: string;
  num_comments?: number;
  story_id?: number;
  story_title?: string;
  story_url?: string;
  parent_id?: number;
  created_at_i: number;
  _tags: string[];
  objectID: string;
  _highlightResult: HighlightResult;
}

export interface HighlightResult {
  author: Author;
  comment_text?: Commenttext;
  story_title?: Author;
  story_url?: Author;
  title?: Author;
  url?: Url;
  story_text?: Commenttext;
}

interface Url {
  value: string;
  matchLevel: string;
  fullyHighlighted?: boolean;
  matchedWords: string[];
}

interface Commenttext {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}

interface Author {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}
