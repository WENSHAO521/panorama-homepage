export interface Conference {
  id: string;
  title: string;
  date: string;
  location: string;
  theme: string;
  description: string;
  registrationUrl: string;
}

export interface Workshop {
  id: string;
  title: string;
  date: string;
  duration: string;
  instructor: string;
  description: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  lead: string;
  collaborators: string[];
  description: string;
  status: 'ongoing' | 'completed';
}

export const upcomingConferences: Conference[] = [
  {
    id: 'conf1',
    title: 'International Conference on AI and Society',
    date: 'March 15-17, 2025',
    location: 'Berlin, Germany',
    theme: 'Ethical AI and Human-Centric Technology',
    description: 'A three-day conference bringing together researchers, policymakers, and industry leaders to discuss the societal implications of artificial intelligence.',
    registrationUrl: '#'
  },
  {
    id: 'conf2',
    title: 'Global Summit on Sustainable Development',
    date: 'June 22-24, 2025',
    location: 'Hong Kong, China',
    theme: 'Rural Governance and Green Innovation',
    description: 'Exploring interdisciplinary approaches to sustainable development, environmental policy, and rural transformation.',
    registrationUrl: '#'
  },
  {
    id: 'conf3',
    title: 'Cross-Cultural Music Research Symposium',
    date: 'September 8-10, 2025',
    location: 'Vienna, Austria',
    theme: 'Musical Traditions in Global Context',
    description: 'Celebrating diverse musical heritage and fostering dialogue between Eastern and Western musicological traditions.',
    registrationUrl: '#'
  }
];

export const workshops: Workshop[] = [
  {
    id: 'ws1',
    title: 'Academic Writing for International Journals',
    date: 'Monthly',
    duration: '4 hours',
    instructor: 'Prof. Sarah Mitchell',
    description: 'Learn best practices for writing and submitting manuscripts to international peer-reviewed journals.'
  },
  {
    id: 'ws2',
    title: 'Peer Review Training Program',
    date: 'Quarterly',
    duration: '2 days',
    instructor: 'Dr. Michael Chen',
    description: 'Comprehensive training for early-career researchers interested in becoming peer reviewers.'
  },
  {
    id: 'ws3',
    title: 'Open Access Publishing Workshop',
    date: 'Bi-monthly',
    duration: '3 hours',
    instructor: 'Dr. Elena Rodriguez',
    description: 'Understanding open access models, copyright, and maximizing research visibility.'
  }
];

export const researchProjects: ResearchProject[] = [
  {
    id: 'proj1',
    title: 'Global Academic Publishing Trends 2025',
    lead: 'Dr. Anna Schmidt',
    collaborators: ['University of Berlin', 'Hong Kong Polytechnic University'],
    description: 'A comprehensive study analyzing trends in academic publishing, open access adoption, and researcher behavior worldwide.',
    status: 'ongoing'
  },
  {
    id: 'proj2',
    title: 'Impact of AI on Peer Review',
    lead: 'Prof. James Anderson',
    collaborators: ['MIT', 'Stanford University'],
    description: 'Investigating how artificial intelligence can enhance the peer review process while maintaining quality and integrity.',
    status: 'ongoing'
  },
  {
    id: 'proj3',
    title: 'East-West Academic Collaboration',
    lead: 'Dr. Li Wei',
    collaborators: ['Peking University', 'Heidelberg University'],
    description: 'Examining patterns and impact of academic collaboration between Eastern and Western institutions.',
    status: 'completed'
  }
];
