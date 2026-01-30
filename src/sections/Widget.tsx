import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Minus, Users, UserCheck, UserCog } from 'lucide-react';

export default function Widget() {
  const { t } = useTranslation();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show widget after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
      {/* Card */}
      <div
        className={`bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden transition-all duration-500 ${
          isMinimized
            ? 'opacity-0 scale-90 pointer-events-none'
            : 'opacity-100 scale-100 pointer-events-auto'
        }`}
        style={{ width: '280px' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-crimson to-[#7e1625] p-4 flex justify-between items-start">
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              {t('widget.title')}
            </h3>
            <p className="text-xs text-white/70 mt-0.5">
              {t('widget.subtitle')}
            </p>
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Minimize"
          >
            <Minus className="w-3 h-3 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-neutral-500 mb-4">
            {t('widget.description')}
          </p>

          <div className="space-y-3">
            {/* Reviewer Option */}
            <a
              href="YOUR_GOOGLE_FORM_LINK_FOR_REVIEWERS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-neutral-50 hover:bg-crimson/5 border border-neutral-100 hover:border-crimson/20 rounded-xl transition-all group"
            >
              <div className="w-9 h-9 rounded-full bg-crimson/10 flex items-center justify-center group-hover:bg-crimson transition-colors">
                <UserCheck className="w-4 h-4 text-crimson group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-800 group-hover:text-crimson transition-colors">
                  {t('widget.reviewerTitle')}
                </div>
                <div className="text-[10px] text-neutral-500">
                  {t('widget.reviewerDesc')}
                </div>
              </div>
            </a>

            {/* Editor Option */}
            <a
              href="YOUR_GOOGLE_FORM_LINK_FOR_EDITORS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-neutral-50 hover:bg-crimson/5 border border-neutral-100 hover:border-crimson/20 rounded-xl transition-all group mb-0"
            >
              <div className="w-9 h-9 rounded-full bg-crimson/10 flex items-center justify-center group-hover:bg-crimson transition-colors">
                <UserCog className="w-4 h-4 text-crimson group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-800 group-hover:text-crimson transition-colors">
                  {t('widget.editorTitle')}
                </div>
                <div className="text-[10px] text-neutral-500">
                  {t('widget.editorDesc')}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setIsMinimized(false)}
        className={`absolute bottom-0 right-0 w-14 h-14 bg-crimson rounded-full shadow-lg shadow-crimson/30 flex items-center justify-center text-white transition-all duration-500 ${
          isMinimized
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-75 pointer-events-none'
        }`}
        aria-label="Expand"
      >
        <span className="absolute inset-0 rounded-full border-2 border-crimson pulse-ring" />
        <Users className="w-6 h-6" />
      </button>
    </div>
  );
}
