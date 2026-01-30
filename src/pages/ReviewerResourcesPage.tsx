import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ClipboardCheck, Scale, Clock, Star, AlertTriangle, Users } from 'lucide-react';

export default function ReviewerResourcesPage() {
  const { t } = useTranslation();

  const responsibilities = [
    {
      icon: ClipboardCheck,
      title: 'Review Responsibilities',
      description: 'Reviewers play a critical role in maintaining the quality and integrity of scholarly publications.'
    },
    {
      icon: Clock,
      title: 'Timely Reviews',
      description: 'Complete reviews within the agreed timeframe, typically 2-4 weeks from invitation.'
    },
    {
      icon: Scale,
      title: 'Objective Evaluation',
      description: 'Provide fair, objective, and constructive feedback to help authors improve their work.'
    },
    {
      icon: AlertTriangle,
      title: 'Conflict of Interest',
      description: 'Decline review invitations if you have any conflicts of interest with the authors or content.'
    }
  ];

  const evaluationCriteria = [
    { title: 'Originality', description: 'Is the work novel and contributing new knowledge?' },
    { title: 'Methodology', description: 'Are the methods appropriate and well-described?' },
    { title: 'Significance', description: 'Does the work have impact on the field?' },
    { title: 'Clarity', description: 'Is the writing clear and well-organized?' },
    { title: 'Ethics', description: 'Are ethical standards properly followed?' },
    { title: 'References', description: 'Are citations appropriate and up-to-date?' },
  ];

  const benefits = [
    'Stay updated with the latest research in your field',
    'Enhance your critical thinking and evaluation skills',
    'Build your academic reputation and CV',
    'Network with editors and fellow researchers',
    'Early access to cutting-edge research',
    'Contribute to the advancement of knowledge'
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
              {t('footer.reviewerResources')}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Guidelines and resources for our peer reviewers
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
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <p className="text-lg text-neutral-600 leading-relaxed">
              Peer review is the cornerstone of academic publishing. Our reviewers help ensure the quality, 
              validity, and significance of the research we publish. We are grateful for your contribution 
              to maintaining high scholarly standards.
            </p>
          </motion.div>

          {/* Responsibilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {responsibilities.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-neutral-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-[#A51C30]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#A51C30]" />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.description}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Evaluation Criteria */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="font-serif text-3xl font-bold text-neutral-900 text-center mb-12">Evaluation Criteria</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {evaluationCriteria.map((criterion) => (
                <div key={criterion.title} className="bg-neutral-50 rounded-xl p-6">
                  <h3 className="font-bold text-neutral-900 mb-2">{criterion.title}</h3>
                  <p className="text-sm text-neutral-600">{criterion.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Benefits of Reviewing</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-[#A51C30] flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#A51C30]/10 rounded-xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-[#A51C30]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Become a Reviewer</h3>
                  <p className="text-neutral-600">Join our reviewer community</p>
                </div>
              </div>
              <p className="text-neutral-600 mb-6">
                If you are interested in becoming a peer reviewer for Panorama Scholarly Group, 
                please complete our reviewer application form. We welcome experts from all disciplines.
              </p>
              <button className="w-full py-3 bg-[#A51C30] text-white font-medium rounded-lg hover:bg-[#8a1728] transition-colors">
                Apply to be a Reviewer
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
