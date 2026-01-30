import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Target, Award, BookOpen, Globe, Users, CheckCircle, Star, Heart, Zap } from 'lucide-react';

export default function AboutPage() {
  const { t } = useTranslation();

  const features = [
    { icon: Target, title: t('about.mission'), description: t('about.missionText') },
    { icon: Award, title: t('about.heritage'), description: t('about.heritageText') },
    { icon: BookOpen, title: t('about.standards'), description: t('about.standardsText') },
  ];

  const values = [
    { icon: Star, title: t('about.excellence'), description: t('about.excellenceText') },
    { icon: Heart, title: t('about.integrity'), description: t('about.integrityText') },
    { icon: Zap, title: t('about.innovation'), description: t('about.innovationText') },
    { icon: Globe, title: t('about.global'), description: t('about.globalText') },
  ];

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
              {t('about.title')}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              German Academic Tradition · Global Vision
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">{t('about.story')}</h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              {t('about.storyText')}
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-8 bg-neutral-50 rounded-2xl"
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-neutral-900 rounded-2xl p-8 lg:p-12 mb-20"
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

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="font-serif text-3xl font-bold text-neutral-900 text-center mb-12">{t('about.values')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center p-6"
                  >
                    <div className="w-14 h-14 bg-[#A51C30]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-[#A51C30]" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-neutral-600">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
