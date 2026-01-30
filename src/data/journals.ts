export interface Journal {
  id: string;
  title: string;
  subject: string;
  description: string;
  issn: string;
  frequency: string;
  coverImage: string;
  viewUrl: string;
  submitUrl: string;
}

// GitHub raw image base URL
const GITHUB_IMG_BASE = 'https://raw.githubusercontent.com/WENSHAO521/panorama-homepage/main/QKFM';

export const journals: Journal[] = [
  {
    id: 'afs',
    title: 'AI & Future Society',
    subject: 'Artificial Intelligence',
    description: 'Exploring AI-driven societal transformations with a focus on ethics, regulation, human-centric approaches, and future-oriented dimensions.',
    issn: '3053-4011',
    frequency: 'Semiannual',
    coverImage: `${GITHUB_IMG_BASE}/AI%20%26%20Future%20Society.png`,
    viewUrl: 'https://grhas.centraluniteduniversity.de/index.php/AFS',
    submitUrl: 'https://grhas.centraluniteduniversity.de/index.php/AFS/submission'
  },
  {
    id: 'cssr',
    title: 'Computational Social Science Review',
    subject: 'Data Science',
    description: 'Advancing computational and data-driven approaches to understanding human behavior and social systems using machine learning and analytics.',
    issn: 'Pending',
    frequency: 'Quarterly',
    coverImage: `${GITHUB_IMG_BASE}/cssr.png`,
    viewUrl: 'https://grhas.centraluniteduniversity.de/index.php/CSSR',
    submitUrl: 'https://grhas.centraluniteduniversity.de/index.php/cssr/submissions'
  },
  {
    id: 'grhas',
    title: 'Global Review of Humanities, Arts and Society',
    subject: 'Humanities',
    description: 'Fostering theoretical innovation and reflective practice across humanities, arts, and social inquiry.',
    issn: '3052-539X',
    frequency: 'Bimonthly',
    coverImage: `${GITHUB_IMG_BASE}/grhas.png`,
    viewUrl: 'https://grhas.centraluniteduniversity.de/index.php/files',
    submitUrl: 'https://grhas.centraluniteduniversity.de/index.php/files/submissions'
  },
  {
    id: 'health',
    title: 'Health Nexus',
    subject: 'Health Sciences',
    description: 'Advancing interdisciplinary medical research with a specific focus on integrative dialogue between Western medicine and Traditional Chinese Medicine.',
    issn: '3053-7037',
    frequency: 'Annual',
    coverImage: `${GITHUB_IMG_BASE}/Health%20Nexus_%20Interdisciplinary%20Medical%20Research%20Journal.png`,
    viewUrl: 'https://grhas.centraluniteduniversity.de/index.php/HealthNexus',
    submitUrl: 'https://grhas.centraluniteduniversity.de/index.php/HealthNexus/submissions'
  },
  {
    id: 'irels',
    title: 'International Review of Education and Learning Sciences',
    subject: 'Education',
    description: 'Dedicated to advancing interdisciplinary research in education, learning sciences, and related fields across the lifespan.',
    issn: 'Pending',
    frequency: 'Semiannual',
    coverImage: `${GITHUB_IMG_BASE}/IRELS.png`,
    viewUrl: 'https://grhas.centraluniteduniversity.de/index.php/IRELS',
    submitUrl: 'https://grhas.centraluniteduniversity.de/index.php/irels/submission'
  },
  {
    id: 'jesa',
    title: 'Journal of Engineering Systems and Applications',
    subject: 'Engineering',
    description: 'Emphasizing interdisciplinary integration, connecting theoretical development, experimental inquiry, and technological innovation.',
    issn: '3053-478X',
    frequency: 'Annual',
    coverImage: `${GITHUB_IMG_BASE}/JESA.png`,
    viewUrl: 'https://grhas.centraluniteduniversity.de/index.php/JESA',
    submitUrl: 'https://grhas.centraluniteduniversity.de/index.php/JESA/submission'
  },
  {
    id: 'jlpcs',
    title: 'Journal of Law, Psychology and Communication Studies',
    subject: 'Law',
    description: 'Exploring the intersections between legal systems, psychological processes, and communicative practices.',
    issn: '3052-9654',
    frequency: 'Semiannual',
    coverImage: `${GITHUB_IMG_BASE}/JLPCS.png`,
    viewUrl: 'https://grhas.centraluniteduniversity.de/index.php/JLPCS',
    submitUrl: 'https://grhas.centraluniteduniversity.de/index.php/JLPCS/submission'
  },
  {
    id: 'pemr',
    title: 'PoliEcoM Administration Review',
    subject: 'Social Sciences',
    description: 'Promoting interdisciplinary dialogue on policymaking, institutional governance, financial regulation, and public sector reform.',
    issn: '3053-3597',
    frequency: 'Semiannual',
    coverImage: `${GITHUB_IMG_BASE}/REMR.png`,
    viewUrl: 'https://grhas.centraluniteduniversity.de/index.php/PEMR',
    submitUrl: 'https://grhas.centraluniteduniversity.de/index.php/PEMR/submission'
  },
  {
    id: 'resonance',
    title: 'Resonance: Global Music Studies',
    subject: 'Musicology',
    description: 'An international journal dedicated to cross-cultural music research. Accepting submissions in English, Chinese, German, Italian, and Russian.',
    issn: '3053-4410',
    frequency: 'Semiannual',
    coverImage: `${GITHUB_IMG_BASE}/Resonance.png`,
    viewUrl: 'https://grhas.centraluniteduniversity.de/index.php/Resonance',
    submitUrl: 'https://grhas.centraluniteduniversity.de/index.php/Resonance/submission'
  },
  {
    id: 'rggd',
    title: 'Rural Governance and Green Development',
    subject: 'Environmental Science',
    description: 'Fostering scholarly dialogue on sustainable rural development, green transition, and environmental governance.',
    issn: '3053-7282',
    frequency: 'Annual',
    coverImage: `${GITHUB_IMG_BASE}/Rural%20Governance%20and%20Green%20Development.png`,
    viewUrl: 'https://grhas.centraluniteduniversity.de/index.php/RGGD',
    submitUrl: 'https://grhas.centraluniteduniversity.de/index.php/RGGD/submission'
  },
  {
    id: 'tts',
    title: 'Three Teachings Studies',
    subject: 'Philosophy',
    description: 'Dedicated to the study of East Asian Confucianism, Daoism, and Buddhism, promoting cross-traditional and interdisciplinary dialogue.',
    issn: '3053-6553',
    frequency: 'Annual',
    coverImage: `${GITHUB_IMG_BASE}/tts.png`,
    viewUrl: 'https://grhas.centraluniteduniversity.de/index.php/TTS',
    submitUrl: 'https://grhas.centraluniteduniversity.de/index.php/tts/submission'
  }
];

export const getJournalById = (id: string): Journal | undefined => {
  return journals.find(j => j.id === id);
};

export const getJournalsBySubject = (subject: string): Journal[] => {
  return journals.filter(j => j.subject.toLowerCase() === subject.toLowerCase());
};
