import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Download } from 'lucide-react';
import { books } from '@/data/books';

export default function FeaturedBooks() {
  const { t } = useTranslation();
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);
  const featuredBooks = books.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-neutral-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#A51C30]/10 text-[#A51C30] text-sm font-medium rounded-full mb-4">
              {t('books.title')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              {t('books.title')}
            </h2>
            <p className="text-lg text-neutral-600">
              {t('books.subtitle')}
            </p>
          </div>
          <Link
            to="/books"
            className="inline-flex items-center gap-2 text-[#A51C30] font-medium hover:underline"
          >
            {t('books.viewAll')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Books Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBooks.map((book, index) => (
            <motion.article
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                {/* Book Cover */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=Book+Cover';
                    }}
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 transition-opacity duration-300 ${hoveredBook === book.id ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-100 transition-colors">
                        <BookOpen className="w-4 h-4" />
                        {t('books.readOnline')}
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#A51C30] text-white text-sm font-medium rounded-lg hover:bg-[#8a1728] transition-colors">
                        <Download className="w-4 h-4" />
                        {t('books.downloadPDF')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      book.category === 'monograph' ? 'bg-blue-100 text-blue-700' :
                      book.category === 'collection' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {t(`books.categories.${book.category}`)}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-[#A51C30] transition-colors">
                    {book.title}
                  </h3>

                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-neutral-500 pt-4 border-t border-neutral-100">
                    <span>{book.author}</span>
                    <span>{book.year}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
