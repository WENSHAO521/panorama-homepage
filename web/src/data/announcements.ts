import announcementData from './announcements.json';
import type { LocaleCode } from '@/i18n/config';

export interface AnnouncementTranslation {
  title: string;
  summary: string;
  type?: string;
}

export interface Announcement {
  id: string;
  source: string;
  sourceLabel: string;
  type: string;
  title: string;
  summary: string;
  date: string;
  href: string;
  fallback?: boolean;
  translations?: Partial<Record<LocaleCode, AnnouncementTranslation>>;
}

const announcements = announcementData.announcements as Announcement[];

/** Return announcement metadata in the requested site language. */
export function getAnnouncements(locale: string = 'en'): Announcement[] {
  const language = locale as LocaleCode;

  return announcements.map((announcement) => {
    const translation = announcement.translations?.[language] ?? announcement.translations?.en;
    if (!translation) return announcement;

    return {
      ...announcement,
      title: translation.title,
      summary: translation.summary,
      type: translation.type ?? announcement.type,
    };
  });
}
