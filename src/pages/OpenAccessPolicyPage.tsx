import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, Unlock, Share2, Users, BookOpen, CheckCircle, ExternalLink } from 'lucide-react';

export default function OpenAccessPolicyPage() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Globe,
      title: 'Global Accessibility',
      description: 'Research is freely available to anyone, anywhere in the world, removing barriers to knowledge.'
    },
    {
      icon: Share2,
      title: 'Increased Visibility',
      description: 'Open access articles receive more citations and have greater impact than subscription-based content.'
    },
    {
      icon: Users,
      title: 'Public Engagement',
      description: 'Taxpayer-funded research becomes accessible to the public who supported it.'
    },
    {
      icon: Unlock,
      title: 'No Paywalls',
      description: 'Readers never encounter subscription barriers or pay-per-view fees.'
    }
  ];

  const licenses = [
    {
      name: 'CC BY',
      description: 'Creative Commons Attribution',
      details: 'Others can distribute, remix, adapt, and build upon your work, even commercially, as long as they credit you.',
      recommended: true
    },
    {
      name: 'CC BY-SA',
      description: 'Creative Commons Attribution-ShareAlike',
      details: 'Others can remix, adapt, and build upon your work, as long as they credit you and license their new creations under identical terms.',
      recommended: false
    },
    {
      name: 'CC BY-NC',
      description: 'Creative Commons Attribution-NonCommercial',
      details: 'Others can remix, adapt, and build upon your work non-commercially, and although their new works must also acknowledge you, they don\'t have to license their derivative works on the same terms.',
      recommended: false
    }
  ];

  const policies = [
    {
      title: 'Immediate Open Access',
      description: 'All articles are published with immediate open access upon acceptance.'
    },
    {
      title: 'No Embargo Periods',
      description: 'Content is freely available from the moment of publication.'
    },
    {
      title: 'No Article Processing Charges',
      description: 'Panorama Scholarly Group does not charge authors any fees for publication.'
    },
    {
      title: 'Repository Archiving',
      description: 'Authors can deposit preprints and postprints in institutional repositories.'
    },
    {
      title: 'Data Availability',
      description: 'Authors are encouraged to make research data openly available.'
    },
    {
      title: 'Long-term Preservation',
      description: 'Content is preserved through partnerships with archiving services.'
    }
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
              {t('footer.openAccessPolicy')}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Free, immediate, and unrestricted access to scholarly research
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <p className="text-lg text-neutral-600 leading-relaxed">
              Panorama Scholarly Group is committed to the principles of open access publishing. 
              We believe that knowledge should be freely accessible to all, and we publish all our 
              content under open access licenses to maximize the dissemination and impact of research.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="bg-neutral-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-[#A51C30]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#A51C30]" />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-neutral-600">{benefit.description}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="font-serif text-3xl font-bold text-neutral-900 text-center mb-12">Our Open Access Policies</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {policies.map((policy) => (
                <div key={policy.title} className="flex items-start gap-4 bg-neutral-50 rounded-xl p-6">
                  <CheckCircle className="w-6 h-6 text-[#A51C30] flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-1">{policy.title}</h3>
                    <p className="text-sm text-neutral-600">{policy.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Licenses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="font-serif text-3xl font-bold text-neutral-900 text-center mb-12">Creative Commons Licenses</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {licenses.map((license) => (
                <div 
                  key={license.name} 
                  className={`rounded-2xl p-6 border-2 ${
                    license.recommended 
                      ? 'border-[#A51C30] bg-[#A51C30]/5' 
                      : 'border-neutral-200 bg-neutral-50'
                  }`}
                >
                  {license.recommended && (
                    <span className="inline-block px-3 py-1 bg-[#A51C30] text-white text-xs font-medium rounded-full mb-4">
                      Recommended
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{license.name}</h3>
                  <p className="text-sm text-[#A51C30] font-medium mb-4">{license.description}</p>
                  <p className="text-sm text-neutral-600">{license.details}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Budapest Declaration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-neutral-900 rounded-2xl p-8 lg:p-12 text-white"
          >
            <div className="flex items-start gap-4">
              <BookOpen className="w-8 h-8 text-[#A51C30] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-4">Budapest Open Access Initiative</h3>
                <p className="text-neutral-300 mb-4">
                  Panorama Scholarly Group endorses the Budapest Open Access Initiative, which defines 
                  open access as the "free availability on the public internet, permitting any users to read, 
                  download, copy, distribute, print, search, or link to the full texts of these articles, 
                  crawl them for indexing, pass them as data to software, or use them for any other lawful purpose."
                </p>
                <a 
                  href="https://www.budapestopenaccessinitiative.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#A51C30] hover:underline"
                >
                  Learn more about BOAI
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
