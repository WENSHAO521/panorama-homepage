export interface Imprint {
  id: string;
  slug: string;
  name: string;
  description: string;
  scope: string;
  logo?: string;
  logoLight?: string;
  accent?: string;
  disciplines?: string[];
}
