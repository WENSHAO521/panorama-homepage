export interface Journal {
  id: string;
  title: string;
  titleZh: string;
  subject: string;
  subjectZh: string;
  description: string;
  descriptionZh: string;
  issn: string;
  issnZh?: string;
  frequency: string;
  frequencyZh: string;
  coverImage: string;
  viewUrl: string;
  submitUrl: string;
}

export interface Partner {
  name: string;
  logo: string;
  url?: string;
}

export interface PartnerCategory {
  title: string;
  titleZh: string;
  partners: Partner[];
}

export interface StatItem {
  icon: string;
  value: string;
  label: string;
}
