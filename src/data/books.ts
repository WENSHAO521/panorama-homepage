export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  isbn: string;
  description: string;
  coverImage: string;
  category: 'monograph' | 'collection' | 'textbook';
}

export const books: Book[] = [
  {
    id: 'book1',
    title: 'Digital Transformation in Academic Publishing',
    author: 'Dr. Sarah Mitchell',
    year: 2024,
    isbn: '978-3-123456-78-9',
    description: 'A comprehensive analysis of how digital technologies are reshaping scholarly communication and academic publishing workflows.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    category: 'monograph'
  },
  {
    id: 'book2',
    title: 'Open Access: Principles and Practice',
    author: 'Prof. Michael Chen',
    year: 2024,
    isbn: '978-3-123456-79-6',
    description: 'An essential guide to understanding open access publishing models, licenses, and their impact on global research dissemination.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    category: 'textbook'
  },
  {
    id: 'book3',
    title: 'Interdisciplinary Approaches to Climate Research',
    author: 'Dr. Elena Rodriguez et al.',
    year: 2023,
    isbn: '978-3-123456-80-2',
    description: 'A collection of papers exploring the intersection of environmental science, policy, and social impact in climate studies.',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=600&fit=crop',
    category: 'collection'
  },
  {
    id: 'book4',
    title: 'AI Ethics in Research and Publication',
    author: 'Prof. James Anderson',
    year: 2024,
    isbn: '978-3-123456-81-9',
    description: 'Examining the ethical implications of artificial intelligence in academic research, peer review, and scholarly publishing.',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=600&fit=crop',
    category: 'monograph'
  },
  {
    id: 'book5',
    title: 'Global Music: Cultural Exchange and Innovation',
    author: 'Dr. Maria Schmidt',
    year: 2023,
    isbn: '978-3-123456-82-6',
    description: 'A scholarly exploration of cross-cultural musical traditions and their influence on contemporary composition.',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=600&fit=crop',
    category: 'monograph'
  },
  {
    id: 'book6',
    title: 'Sustainable Development: Policy and Practice',
    author: 'Dr. Li Wei, Prof. Anna Kowalski',
    year: 2024,
    isbn: '978-3-123456-83-3',
    description: 'A comprehensive examination of sustainable development goals implementation across different regions and sectors.',
    coverImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=600&fit=crop',
    category: 'collection'
  }
];
