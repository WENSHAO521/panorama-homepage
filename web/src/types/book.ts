export interface Book {
  slug: string;
  title: string;
  subtitle?: string;
  authors: string[];
  editors?: string[];
  isbn?: string;
  publicationDate?: string;
  cover?: string;
  description?: string;
  imprint: string;
  language: string;
  status: 'forthcoming' | 'published' | 'out-of-print';
}
