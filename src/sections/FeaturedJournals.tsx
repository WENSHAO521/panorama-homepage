import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Send } from 'lucide-react';
import { journals } from '@/data/journals';

export default function FeaturedJournals() {
  const { t } = useTranslation();
  const featuredJournals = journals.slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-white">
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
              {t('journals.title')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              {t('journals.title')}
            </h2>
            <p className="text-lg text-neutral-600">
              {t('journals.subtitle')}
            </p>
          </div>
          <Link
            to="/journals"
            className="inline-flex items-center gap-2 text-[#A51C30] font-medium hover:underline"
          >
            {t('journals.browseAll')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Journals Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {featuredJournals.map((journal, index) => (
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
                <div className="sm:w-36 lg:w-44 p-4 flex-shrink-0">
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
                      {t('journals.openAccess')}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2 group-hover:text-[#A51C30] transition-colors line-clamp-2">
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
      </div>
    </section>
  );
}
