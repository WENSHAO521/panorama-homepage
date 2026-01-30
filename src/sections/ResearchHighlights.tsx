import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Lightbulb, UserPlus } from 'lucide-react';
import { upcomingConferences, researchProjects } from '@/data/research';

export default function ResearchHighlights() {
  const { t } = useTranslation();
  const featuredConferences = upcomingConferences.slice(0, 2);
  const featuredProjects = researchProjects.slice(0, 2);

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
              {t('research.title')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              {t('research.title')}
            </h2>
            <p className="text-lg text-neutral-600">
              {t('research.subtitle')}
            </p>
          </div>
          <Link
            to="/research"
            className="inline-flex items-center gap-2 text-[#A51C30] font-medium hover:underline"
          >
            {t('common.viewDetails')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Conferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-5 h-5 text-[#A51C30]" />
              <h3 className="text-xl font-bold text-neutral-900">{t('research.upcomingConferences')}</h3>
            </div>

            <div className="space-y-4">
              {featuredConferences.map((conf, index) => (
                <motion.div
                  key={conf.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-neutral-50 rounded-xl p-5 border border-neutral-100 hover:border-[#A51C30]/30 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2 text-sm text-[#A51C30] font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    {conf.date}
                  </div>
                  <h4 className="font-bold text-neutral-900 mb-2">{conf.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    {conf.location}
                  </div>
                  <p className="text-sm text-neutral-600 line-clamp-2">{conf.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Research Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-5 h-5 text-[#A51C30]" />
              <h3 className="text-xl font-bold text-neutral-900">{t('research.researchProjects')}</h3>
            </div>

            <div className="space-y-4">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-neutral-50 rounded-xl p-5 border border-neutral-100 hover:border-[#A51C30]/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-neutral-900">{project.title}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      project.status === 'ongoing' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {t(`research.${project.status}`)}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-3">{project.description}</p>
                  <div className="text-xs text-neutral-500">
                    <span className="font-medium">{t('research.lead')}:</span> {project.lead}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Editorial Recruitment CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 bg-gradient-to-r from-[#A51C30] to-[#8a1728] rounded-xl p-5 text-white"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1">{t('research.editorialRecruitment')}</h4>
                  <p className="text-sm text-white/80">Join our editorial board and shape the future of academic publishing</p>
                </div>
                <Link
                  to="/research"
                  className="px-4 py-2 bg-white text-[#A51C30] text-sm font-medium rounded-lg hover:bg-neutral-100 transition-colors flex-shrink-0"
                >
                  {t('research.applyNow')}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
