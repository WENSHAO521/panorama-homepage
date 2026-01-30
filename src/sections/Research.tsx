import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ArrowRight, GraduationCap, Lightbulb, UserPlus } from 'lucide-react';
import { upcomingConferences, workshops, researchProjects } from '@/data/research';

export default function Research() {
  const { t } = useTranslation();

  return (
    <section id="research" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[#A51C30]/10 text-[#A51C30] text-sm font-medium rounded-full mb-4">
            {t('research.title')}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            {t('research.title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('research.subtitle')}
          </p>
        </motion.div>

        {/* Upcoming Conferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="w-6 h-6 text-[#A51C30]" />
            <h3 className="text-2xl font-bold text-neutral-900">{t('research.upcomingConferences')}</h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {upcomingConferences.map((conf, index) => (
              <motion.div
                key={conf.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 hover:border-[#A51C30]/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 text-sm text-[#A51C30] font-medium mb-3">
                  <Calendar className="w-4 h-4" />
                  {conf.date}
                </div>
                <h4 className="font-serif text-lg font-bold text-neutral-900 mb-2">{conf.title}</h4>
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                  <MapPin className="w-4 h-4" />
                  {conf.location}
                </div>
                <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{conf.description}</p>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                  <Lightbulb className="w-4 h-4" />
                  Theme: {conf.theme}
                </div>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#A51C30] text-white text-sm font-medium rounded-lg hover:bg-[#8a1728] transition-colors">
                  {t('research.register')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Workshops & Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Workshops */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-[#A51C30]" />
              <h3 className="text-2xl font-bold text-neutral-900">{t('research.workshops')}</h3>
            </div>

            <div className="space-y-4">
              {workshops.map((workshop, index) => (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-neutral-50 rounded-xl p-5 border border-neutral-100 hover:border-[#A51C30]/30 transition-colors"
                >
                  <h4 className="font-bold text-neutral-900 mb-2">{workshop.title}</h4>
                  <p className="text-sm text-neutral-600 mb-3">{workshop.description}</p>
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {workshop.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {workshop.instructor}
                    </span>
                  </div>
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
              <Lightbulb className="w-6 h-6 text-[#A51C30]" />
              <h3 className="text-2xl font-bold text-neutral-900">{t('research.researchProjects')}</h3>
            </div>

            <div className="space-y-4">
              {researchProjects.map((project, index) => (
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
                      {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-3">{project.description}</p>
                  <div className="text-xs text-neutral-500">
                    <span className="font-medium">Lead:</span> {project.lead}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Editorial Recruitment CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
  );
}
