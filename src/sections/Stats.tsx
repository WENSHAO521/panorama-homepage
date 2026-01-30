import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Users, Globe, CheckCircle } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  value: string;
  labelKey: string;
}

function AnimatedValue({ value, isVisible }: { value: string; isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState('0');
  const numericPart = value.match(/\d+/)?.[0] || '';
  const suffix = value.replace(/\d+/, '');

  useEffect(() => {
    if (!isVisible || !numericPart) {
      setDisplayValue(value);
      return;
    }

    const target = parseInt(numericPart, 10);
    const duration = 1500;
    const steps = 30;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayValue(target + suffix);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current) + suffix);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value, numericPart, suffix]);

  return <span>{displayValue}</span>;
}

export default function Stats() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    { icon: BookOpen, value: '120+', labelKey: 'stats.publishedArticles' },
    { icon: Users, value: '350+', labelKey: 'stats.globalAuthors' },
    { icon: Globe, value: '100%', labelKey: 'stats.openAccess' },
    { icon: CheckCircle, value: 'Blind', labelKey: 'stats.peerReview' }
  ];

  return (
    <section ref={sectionRef} className="bg-white border-y border-neutral-100 py-10 md:py-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 md:gap-4 transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-crimson/5 flex items-center justify-center">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-crimson" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 leading-none">
                    <AnimatedValue value={stat.value} isVisible={isVisible} />
                  </div>
                  <div className="text-[10px] md:text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">
                    {t(stat.labelKey)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
