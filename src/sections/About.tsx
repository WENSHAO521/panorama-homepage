import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Target, Award, BookOpen, Globe, Users, CheckCircle } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Target,
      title: t('about.mission'),
      description: t('about.missionText')
    },
    {
      icon: Award,
      title: t('about.heritage'),
      description: t('about.heritageText')
    },
    {
      icon: BookOpen,
      title: t('about.standards'),
      description: t('about.standardsText')
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[#A51C30]/10 text-[#A51C30] text-sm font-medium rounded-full mb-4">
            About Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            {t('about.title')}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#A51C30]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-[#A51C30]" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-neutral-900 rounded-2xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#A51C30] rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">11</div>
              <div className="text-sm text-neutral-400">Peer-Reviewed Journals</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#A51C30] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">9</div>
              <div className="text-sm text-neutral-400">Languages Supported</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#A51C30] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">350+</div>
              <div className="text-sm text-neutral-400">Global Authors</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#A51C30] rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-neutral-400">Open Access</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
