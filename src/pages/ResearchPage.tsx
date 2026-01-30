import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ArrowRight, GraduationCap, Lightbulb, UserPlus } from 'lucide-react';
import { upcomingConferences, workshops, researchProjects } from '@/data/research';

export default function ResearchPage() {
  const { t } = useTranslation();

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
              {t('research.title')}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {t('research.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-6">
          {/* Upcoming Conferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-6 h-6 text-[#A51C30]" />
              <h2 className="text-2xl font-bold text-neutral-900">{t('research.upcomingConferences')}</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {upcomingConferences.map((conf, index) => (
                <motion.div
                  key={conf.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 hover:border-[#A51C30]/30 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2 text-sm text-[#A51C30] font-medium mb-3">
                    <Calendar className="w-4 h-4" />
                    {conf.date}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2">{conf.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                    <MapPin className="w-4 h-4" />
                    {conf.location}
                  </div>
                  <p className="text-sm text-neutral-600 mb-4">{conf.description}</p>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                    <Lightbulb className="w-4 h-4" />
                    {t('research.theme')}: {conf.theme}
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#A51C30] text-white text-sm font-medium rounded-lg hover:bg-[#8a1728] transition-colors">
                    {t('research.register')}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Workshops */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-6 h-6 text-[#A51C30]" />
              <h2 className="text-2xl font-bold text-neutral-900">{t('research.workshops')}</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshops.map((workshop, index) => (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-neutral-50 rounded-xl p-6 border border-neutral-100 hover:border-[#A51C30]/30 transition-colors"
                >
                  <h3 className="font-bold text-neutral-900 mb-3">{workshop.title}</h3>
                  <p className="text-sm text-neutral-600 mb-4">{workshop.description}</p>
                  <div className="space-y-2 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {workshop.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {t('research.instructor')}: {workshop.instructor}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Research Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <Lightbulb className="w-6 h-6 text-[#A51C30]" />
              <h2 className="text-2xl font-bold text-neutral-900">{t('research.researchProjects')}</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-neutral-50 rounded-xl p-6 border border-neutral-100 hover:border-[#A51C30]/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-neutral-900">{project.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      project.status === 'ongoing' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {t(`research.${project.status}`)}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-4">{project.description}</p>
                  <div className="text-sm text-neutral-500">
                    <span className="font-medium">{t('research.lead')}:</span> {project.lead}
                  </div>
                  <div className="mt-3 text-xs text-neutral-400">
                    {project.collaborators.join(', ')}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Editorial Recruitment CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-[#A51C30] to-[#8a1728] rounded-2xl p-8 lg:p-12 text-white"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <UserPlus className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{t('research.editorialRecruitment')}</h3>
                  <p className="text-white/80">Join our editorial board and shape the future of academic publishing</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#A51C30] font-medium rounded-lg hover:bg-neutral-100 transition-colors">
                {t('research.applyNow')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
