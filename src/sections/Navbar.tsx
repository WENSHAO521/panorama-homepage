import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { languages } from '@/i18n';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangMenuOpen(false);
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/journals', label: t('nav.journals') },
    { to: '/books', label: t('nav.books') },
    { to: '/research', label: t('nav.research') },
    { to: '/about', label: t('nav.about') },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-neutral-900 py-2 hidden lg:block">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6 text-xs text-neutral-400">
            <span className="flex items-center gap-2">
              <Globe className="w-3 h-3 text-[#A51C30]" />
              Global Scholarly Network
            </span>
            <span className="text-neutral-600">|</span>
            <span>German Origins · Global Reach</span>
          </div>
          <div className="text-xs text-neutral-500">PSG · Advancing Knowledge</div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0">
                <img
                  src="https://raw.githubusercontent.com/WENSHAO521/GRHAS/main/PEMR/image-removebg-preview.png"
                  alt={t('brand.fullName')}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <div className="font-serif text-lg lg:text-xl font-bold text-neutral-900 leading-tight">
                  {t('brand.name')}
                </div>
                <div className="text-[10px] lg:text-xs text-neutral-500 tracking-wider uppercase">
                  {t('brand.subtitle')}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors relative group ${
                    isActive(link.to) ? 'text-[#A51C30]' : 'text-neutral-700 hover:text-[#A51C30]'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#A51C30] transition-all ${
                    isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <span className="text-lg">{currentLang.flag}</span>
                  <span className="hidden sm:block text-sm font-medium text-neutral-700">
                    {currentLang.code.toUpperCase()}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 z-50"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                            i18n.language === lang.code ? 'bg-[#A51C30]/5 text-[#A51C30]' : 'text-neutral-700'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="text-sm">{lang.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Login Button */}
              <a
                href="https://grhas.centraluniteduniversity.de/index.php/index/login"
                className="hidden sm:block px-4 py-2 text-sm font-medium text-[#A51C30] border border-[#A51C30] rounded-lg hover:bg-[#A51C30] hover:text-white transition-colors"
              >
                {t('nav.login')}
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-700 hover:text-[#A51C30] transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-neutral-100 overflow-hidden"
            >
              <div className="container mx-auto px-6 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(link.to) 
                        ? 'bg-[#A51C30]/10 text-[#A51C30]' 
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-[#A51C30]'
                    }`}
                  >
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}
                <div className="pt-4 border-t border-neutral-100">
                  <p className="px-4 text-xs text-neutral-500 mb-3">{t('languages.title')}</p>
                  <div className="grid grid-cols-3 gap-2 px-4">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          i18n.language === lang.code 
                            ? 'bg-[#A51C30] text-white' 
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-xs">{lang.code.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
