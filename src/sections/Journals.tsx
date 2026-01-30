import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, ArrowUpDown, ExternalLink, Send, BookOpen } from 'lucide-react';
import { journals } from '@/data/journals';

export default function Journals() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'az' | 'subject'>('az');

  const filteredJournals = useMemo(() => {
    let result = journals.filter(journal => 
      journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      journal.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      journal.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      result.sort((a, b) => a.subject.localeCompare(b.subject));
    }

    return result;
  }, [searchQuery, sortBy]);

  return (
    <section id="journals" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-[#A51C30]/10 text-[#A51C30] text-sm font-medium rounded-full mb-4">
            {t('journals.title')}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            {t('journals.title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('journals.subtitle')}
          </p>
        </motion.div>

        {/* Search and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder={t('journals.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#A51C30] focus:ring-2 focus:ring-[#A51C30]/10 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('az')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                sortBy === 'az'
                  ? 'bg-[#A51C30] text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <ArrowUpDown className="w-4 h-4" />
              {t('journals.sortAZ')}
            </button>
            <button
              onClick={() => setSortBy('subject')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                sortBy === 'subject'
                  ? 'bg-[#A51C30] text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {t('journals.sortSubject')}
            </button>
          </div>
        </motion.div>

        {/* Journals Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredJournals.map((journal, index) => (
            <motion.article
              key={journal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 hover:border-[#A51C30]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Cover Image */}
                <div className="sm:w-40 lg:w-48 p-4 flex-shrink-0">
                  <div className="aspect-[3/4] bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={journal.coverImage}
                      alt={journal.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=Journal+Cover';
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-[#A51C30]/10 text-[#A51C30] text-xs font-medium rounded-full">
                      {journal.subject}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Open Access
                    </span>
                  </div>

                  <h3 className="font-serif text-lg lg:text-xl font-bold text-neutral-900 mb-2 group-hover:text-[#A51C30] transition-colors">
                    {journal.title}
                  </h3>

                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2 flex-1">
                    {journal.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
                    <span>{t('journals.issn')}: {journal.issn}</span>
                    <span>·</span>
                    <span>{journal.frequency}</span>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={journal.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-neutral-200 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('journals.viewJournal')}
                    </a>
                    <a
                      href={journal.submitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#A51C30] text-white text-sm font-medium rounded-lg hover:bg-[#8a1728] transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      {t('journals.submit')}
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredJournals.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">No journals found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}
