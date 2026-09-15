export interface Partner {
  id: string;
  name: string;
  category: 'institutional-partner' | 'indexing-database' | 'archiving-service' | 'scholarly-service';
  logo: string;
  url?: string;
  notes?: string;
}
