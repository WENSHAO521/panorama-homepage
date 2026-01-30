import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MapPin, Twitter, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t('nav.journals'), to: '/journals' },
    { label: t('nav.books'), to: '/books' },
    { label: t('nav.research'), to: '/research' },
    { label: t('nav.about'), to: '/about' },
  ];

  const resources = [
    { label: t('footer.authorGuidelines'), to: '/author-guidelines' },
    { label: t('footer.reviewerResources'), to: '/reviewer-resources' },
    { label: t('footer.publicationEthics'), to: '/publication-ethics' },
    { label: t('footer.openAccessPolicy'), to: '/open-access-policy' },
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex-shrink-0">
                <img
                  src="https://raw.githubusercontent.com/WENSHAO521/GRHAS/main/PEMR/image-removebg-preview.png"
                  alt={t('brand.fullName')}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-serif text-xl font-bold">{t('brand.name')}</div>
                <div className="text-xs text-neutral-400 tracking-wider uppercase">{t('brand.subtitle')}</div>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-[#A51C30] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-[#A51C30] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-[#A51C30] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-lg mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-neutral-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-lg mb-6">{t('footer.resources')}</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.to}>
                  <Link to={resource.to} className="text-neutral-400 hover:text-white transition-colors">
                    {resource.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-lg mb-6">{t('footer.contact')}</h4>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-[#A51C30] font-medium mb-1">{t('footer.academicHQ')}</div>
                <div className="flex items-start gap-2 text-neutral-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {t('footer.berlin')}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#A51C30] font-medium mb-1">{t('footer.opsCenter')}</div>
                <div className="flex items-start gap-2 text-neutral-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {t('footer.hongkong')}
                </div>
              </div>
              <div className="flex items-center gap-2 text-neutral-400 text-sm pt-2 border-t border-neutral-800">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@panorama-sg.com" className="hover:text-white transition-colors">
                  contact@panorama-sg.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-sm text-neutral-500 hover:text-white transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <Link to="/terms-of-use" className="text-sm text-neutral-500 hover:text-white transition-colors">
                {t('footer.termsOfUse')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
