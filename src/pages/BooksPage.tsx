import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen, Download, FileText } from 'lucide-react';
import { books } from '@/data/books';

export default function BooksPage() {
  const { t } = useTranslation();
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#A51C30] to-[#8a1728] py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('books.title')}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {t('books.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          {/* Books Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book, index) => (
              <motion.article
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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

                    <div className="mt-3 text-xs text-neutral-400">
                      {t('books.isbn')}: {book.isbn}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-neutral-100 rounded-xl">
              <FileText className="w-6 h-6 text-[#A51C30]" />
              <div className="text-left">
                <p className="font-medium text-neutral-900">More publications coming soon</p>
                <p className="text-sm text-neutral-500">Stay tuned for our upcoming releases</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
