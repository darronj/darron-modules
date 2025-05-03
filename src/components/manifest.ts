import heroSection from '../../examples/components/hero-section/description.json';
import pricingTable from '../../examples/components/pricing-table/description.json';
import teamGrid from '../../examples/components/team-grid/description.json';

export interface ComponentData {
  name: string;
  version: string;
  description: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  thumbnail: string;
  dependencies: Record<string, string>;
  variants: string[];
  files: Array<{
    path: string;
    type: string;
  }>;
}

export const components: Record<string, ComponentData> = {
  'hero-section': heroSection,
  'pricing-table': pricingTable,
  'team-grid': teamGrid
}; 