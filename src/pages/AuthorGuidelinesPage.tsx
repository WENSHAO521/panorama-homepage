import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertCircle, Upload, Users } from 'lucide-react';

export default function AuthorGuidelinesPage() {
  const { t } = useTranslation();

  const guidelines = [
    {
      icon: FileText,
      title: 'Manuscript Preparation',
      items: [
        'Manuscripts should be written in clear, concise English',
        'Follow the journal-specific formatting guidelines',
        'Include an abstract of 150-250 words',
        'Provide 4-6 keywords for indexing purposes',
        'Use standard international units and nomenclature'
      ]
    },
    {
      icon: Upload,
      title: 'Submission Process',
      items: [
        'Submit manuscripts through our online submission system',
        'Include a cover letter explaining the significance of your work',
        'Provide author information and affiliations',
        'Declare any conflicts of interest',
        'Suggest potential reviewers (optional)'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Ethical Requirements',
      items: [
        'Obtain ethical approval for research involving human subjects',
        'Ensure informed consent from all participants',
        'Follow ethical guidelines for animal research',
        'Disclose any funding sources',
        'Avoid plagiarism and ensure original work'
      ]
    },
    {
      icon: Users,
      title: 'Authorship Criteria',
      items: [
        'All authors must have made substantial contributions',
        'Authors must approve the final manuscript',
        'Corresponding author takes responsibility for the work',
        'Clearly define each author\'s contribution',
        'Include ORCID IDs for all authors'
      ]
    }
  ];

  const steps = [
    { number: '01', title: 'Prepare Manuscript', description: 'Format your manuscript according to journal guidelines' },
    { number: '02', title: 'Submit Online', description: 'Use our submission system to upload your manuscript' },
    { number: '03', title: 'Initial Check', description: 'Editorial team reviews for completeness and scope' },
    { number: '04', title: 'Peer Review', description: 'Double-blind peer review by expert reviewers' },
    { number: '05', title: 'Decision', description: 'Editorial decision: accept, revise, or reject' },
    { number: '06', title: 'Publication', description: 'Accepted manuscripts are published open access' },
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
              {t('footer.authorGuidelines')}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Everything you need to know about publishing with Panorama Scholarly Group
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          {/* Guidelines Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {guidelines.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-neutral-50 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#A51C30]/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#A51C30]" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, _i) => (
                      <li key={_i} className="flex items-start gap-3 text-neutral-600">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Publication Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="font-serif text-3xl font-bold text-neutral-900 text-center mb-12">Publication Process</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="relative"
                >
                  <div className="bg-neutral-50 rounded-xl p-6 h-full">
                    <div className="text-4xl font-bold text-[#A51C30]/20 mb-4">{step.number}</div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-neutral-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-8"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-amber-800 mb-2">Important Notice</h3>
                <p className="text-amber-700">
                  Panorama Scholarly Group does not charge any article processing charges (APC) or submission fees. 
                  All publications are freely accessible under open access licenses. Please be aware of predatory 
                  journals and only submit through our official submission systems.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
