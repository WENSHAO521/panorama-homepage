export interface Partner {
  id: string;
  name: string;
  category: 'institutional-partner' | 'publishing-partner' | 'indexing-database' | 'archiving-service' | 'scholarly-service';
  logo?: string | null;
  url?: string;
  notes?: string;
}
