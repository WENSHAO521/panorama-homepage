import announcementData from './announcements.json';
import { getGroupAnnouncementCopy } from '@/i18n/announcements';

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
}

const announcements = announcementData.announcements as Announcement[];

/** External announcements stay canonical; group-authored fallback copy follows the page locale. */
export function getAnnouncements(locale = 'en'): Announcement[] {
  return announcements.map((announcement) => {
    if (!announcement.fallback) return announcement;
    const copy = getGroupAnnouncementCopy(announcement.id, locale);
    return copy ? { ...announcement, ...copy } : announcement;
  });
}
