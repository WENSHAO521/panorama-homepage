import announcementData from './announcements.json';

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

/** Keep announcement content canonical; page labels are localized in the news copy. */
export function getAnnouncements(): Announcement[] {
  return announcements;
}
