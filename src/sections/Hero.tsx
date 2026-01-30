import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, BookMarked, Users } from 'lucide-react';

export default function Hero() {
  const { t } = useTranslation();
  const [count, setCount] = useState({ articles: 0, authors: 0, journals: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCount({
        articles: Math.floor(120 * progress),
        authors: Math.floor(350 * progress),
        journals: Math.floor(11 * progress)
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-neutral-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#A51C30]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-neutral-200 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#A51C30]/10 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-[#A51C30] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#A51C30]">{t('hero.badge')}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-6"
          >
            {t('hero.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link
              to="/journals"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#A51C30] text-white font-medium rounded-lg hover:bg-[#8a1728] transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              {t('hero.exploreJournals')}
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 font-medium rounded-lg border border-neutral-200 hover:border-[#A51C30] hover:text-[#A51C30] transition-colors"
            >
              <BookMarked className="w-5 h-5" />
              {t('hero.viewBooks')}
            </Link>
            <Link
              to="/research"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 font-medium rounded-lg border border-neutral-200 hover:border-[#A51C30] hover:text-[#A51C30] transition-colors"
            >
              <Users className="w-5 h-5" />
              {t('hero.joinResearch')}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          >
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-[#A51C30]">{count.articles}+</div>
              <div className="text-sm text-neutral-500 mt-1">{t('stats.articles')}</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-[#A51C30]">{count.authors}+</div>
              <div className="text-sm text-neutral-500 mt-1">{t('stats.authors')}</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-[#A51C30]">{count.journals}</div>
              <div className="text-sm text-neutral-500 mt-1">{t('stats.journals')}</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-[#A51C30]">100%</div>
              <div className="text-sm text-neutral-500 mt-1">{t('stats.openAccess')}</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 hidden lg:block">
        <div className="relative w-full h-full">
          <div className="absolute top-10 right-10 w-48 h-64 bg-gradient-to-br from-[#A51C30]/20 to-[#A51C30]/5 rounded-2xl transform rotate-6" />
          <div className="absolute top-20 right-32 w-40 h-56 bg-gradient-to-br from-neutral-200 to-neutral-100 rounded-2xl transform -rotate-3" />
          <div className="absolute bottom-20 right-20 w-44 h-60 bg-gradient-to-br from-[#A51C30]/10 to-transparent rounded-2xl transform rotate-12" />
        </div>
      </div>
    </section>
  );
}
