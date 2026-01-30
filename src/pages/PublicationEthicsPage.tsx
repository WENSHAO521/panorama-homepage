import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, FileText, Users, Ban, Scale, BookOpen } from 'lucide-react';

export default function PublicationEthicsPage() {
  const { t } = useTranslation();

  const principles = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We are committed to maintaining the highest standards of publication ethics and integrity.'
    },
    {
      icon: Scale,
      title: 'Fairness',
      description: 'All manuscripts are evaluated fairly based on their scientific merit and originality.'
    },
    {
      icon: Users,
      title: 'Transparency',
      description: 'We maintain transparency in our editorial processes and decision-making.'
    },
    {
      icon: BookOpen,
      title: 'Accountability',
      description: 'We take responsibility for the content we publish and address any concerns promptly.'
    }
  ];

  const authorResponsibilities = [
    'Submit original work that has not been published elsewhere',
    'Properly cite all sources and avoid plagiarism',
    'Disclose all conflicts of interest',
    'Ensure all co-authors meet authorship criteria',
    'Obtain necessary permissions for copyrighted material',
    'Report research findings accurately and honestly'
  ];

  const reviewerResponsibilities = [
    'Maintain confidentiality of manuscript content',
    'Provide objective and constructive feedback',
    'Declare any conflicts of interest',
    'Complete reviews in a timely manner',
    'Do not use information from manuscripts for personal gain'
  ];

  const editorResponsibilities = [
    'Make fair and unbiased editorial decisions',
    'Maintain confidentiality of the review process',
    'Handle appeals and complaints appropriately',
    'Ensure timely processing of manuscripts',
    'Address ethical concerns and misconduct allegations'
  ];

  const misconductTypes = [
    { title: 'Plagiarism', description: 'Using others\' work without proper attribution' },
    { title: 'Data Fabrication', description: 'Making up data or research findings' },
    { title: 'Data Falsification', description: 'Manipulating or misrepresenting research data' },
    { title: 'Duplicate Publication', description: 'Publishing the same work multiple times' },
    { title: 'Authorship Misconduct', description: 'Ghostwriting or inappropriate authorship' },
    { title: 'Conflict of Interest', description: 'Failing to disclose relevant conflicts' },
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
              {t('footer.publicationEthics')}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Our commitment to ethical scholarly publishing
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          {/* Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <div key={principle.title} className="bg-neutral-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-[#A51C30]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#A51C30]" />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2">{principle.title}</h3>
                  <p className="text-sm text-neutral-600">{principle.description}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Responsibilities Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid lg:grid-cols-3 gap-8 mb-20"
          >
            {/* Authors */}
            <div className="bg-neutral-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#A51C30]/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#A51C30]" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Author Responsibilities</h3>
              </div>
              <ul className="space-y-3">
                {authorResponsibilities.map((item, _i) => (
                  <li key={_i} className="flex items-start gap-3 text-sm text-neutral-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviewers */}
            <div className="bg-neutral-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#A51C30]/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#A51C30]" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Reviewer Responsibilities</h3>
              </div>
              <ul className="space-y-3">
                {reviewerResponsibilities.map((item, _i) => (
                  <li key={_i} className="flex items-start gap-3 text-sm text-neutral-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Editors */}
            <div className="bg-neutral-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#A51C30]/10 rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#A51C30]" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Editor Responsibilities</h3>
              </div>
              <ul className="space-y-3">
                {editorResponsibilities.map((item, _i) => (
                  <li key={_i} className="flex items-start gap-3 text-sm text-neutral-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Research Misconduct */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <Ban className="w-6 h-6 text-[#A51C30]" />
              <h2 className="text-2xl font-bold text-neutral-900">Research Misconduct</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {misconductTypes.map((type) => (
                <div key={type.title} className="bg-red-50 border border-red-100 rounded-xl p-6">
                  <h3 className="font-bold text-red-800 mb-2">{type.title}</h3>
                  <p className="text-sm text-red-600">{type.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Reporting Concerns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-neutral-900 rounded-2xl p-8 lg:p-12 text-white"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-[#A51C30] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-4">Reporting Ethical Concerns</h3>
                <p className="text-neutral-300 mb-4">
                  If you have concerns about potential ethical violations in any of our publications, 
                  please contact our Editorial Office. All reports will be handled confidentially and 
                  investigated thoroughly according to COPE (Committee on Publication Ethics) guidelines.
                </p>
                <a 
                  href="mailto:ethics@panorama-sg.com" 
                  className="inline-flex items-center gap-2 text-[#A51C30] hover:underline"
                >
                  ethics@panorama-sg.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
