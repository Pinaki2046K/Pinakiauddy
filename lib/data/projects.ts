export type ProjectStatus = 'deployed' | 'not-deployed' | 'in-progress';
export type ProjectCategory = 'web-app' | 'ai-ml' | 'productivity' | 'fullstack';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory[];
  description: string;
  stack: string[];
  status: ProjectStatus;
  liveUrl?: string;
  githubUrl?: string;
  notDeployedReason?: string;
  architectureNotes?: string;
  screenshots: string[];
  thumbnail?: string;
  iconType?: 'robot' | 'media' | 'pulse' | 'stream' | 'task';
}

export const PROJECTS: Project[] = [



  {
    id: 'vickybytes-live',
    title: 'VickyBytes Live',
    category: ['web-app'],
    description:
      'A retro-futuristic live event streaming UI built as a frontend engineering assignment. Implements a responsive, high-density event schedule interface with real-time stream status indicators, a custom video player component, and a retro CRT aesthetic layered over a modern Next.js App Router architecture.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'App Router'],
    status: 'deployed',
    liveUrl: 'https://event-streaming-dusky.vercel.app',
    githubUrl: 'https://github.com/pinakiauddy49',
    screenshots: [],
    thumbnail: undefined,
    iconType: 'stream',
  },
  {
    id: 'vibecheck-event-management',
    title: 'Event Ticket Management System',
    category: ['web-app', 'fullstack'],
    description:
      'Developed a full-stack event ticket management platform that enables users to browse events, book tickets, and manage reservations through a seamless web interface. Implemented secure user authentication, role-based access control, and dynamic event management features, allowing administrators to create, update, and monitor events efficiently.\n\nBuilt a scalable RESTful backend using Node.js, Express.js, and MongoDB, while delivering a responsive frontend experience with React.js. Integrated ticket booking workflows, user dashboards, and event analytics to streamline event organization and enhance user engagement.',
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JavaScript', 'REST APIs', 'JWT Authentication', 'Git', 'GitHub'],
    status: 'in-progress',
    githubUrl: 'https://github.com/Pinaki2046K/event-ticket-management',
    screenshots: [
      '/vibecheck-5.jpg',
      '/vibecheck-4.jpg',
      '/vibecheck-3.jpg',
      '/vibecheck-2.jpg',
      '/vibecheck-1.jpg'
    ],
    thumbnail: '/vibecheck-5.jpg',
    iconType: 'task',
  },
  {
    id: 'ket-mehsana',
    title: 'KET Mehsana — NGO & Community Impact Platform',
    category: ['web-app'],
    description:
      "Developed a modern, responsive website for KET Mehsana, a non-profit organization focused on community development and social initiatives. Designed and implemented a user-friendly interface to showcase the organization's mission, programs, events, and impact while improving accessibility, engagement, and online visibility through SEO-focused development practices.",
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive Design', 'SEO', 'Git', 'GitHub'],
    status: 'deployed',
    liveUrl: 'https://ket-pearl.vercel.app/contact/',
    githubUrl: 'https://github.com/Pinaki2046K/KET-Mehsana',
    screenshots: ['/ket-mehsana-1.jpg'],
    thumbnail: '/ket-mehsana-1.jpg',
    iconType: 'media',
  },
  {
    id: 'gws-erp',
    title: 'Global Water Solutions ERP',
    category: ['web-app', 'fullstack'],
    description:
      'Developed a comprehensive ERP platform for Global Water Solutions to streamline business operations, centralize organizational data, and improve workflow efficiency. Built modules for managing resources, operational processes, and administrative tasks through a unified dashboard, enabling better visibility and decision-making across the organization.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'REST APIs'],
    status: 'deployed',
    githubUrl: 'https://github.com/Pinaki2046K/global-water-solutions',
    screenshots: [
      '/gws-erp-1.png',
      '/gws-erp-2.png',
      '/gws-erp-3.png',
      '/gws-erp-4.png'
    ],
    thumbnail: '/gws-erp-1.png',
    iconType: 'task',
  },
  {
    id: 'aria-crm',
    title: 'ARIA — AI-Powered CRM Platform',
    category: ['ai-ml', 'web-app', 'fullstack'],
    description:
      'Engineered a modern CRM platform that combines customer management with AI-assisted campaign workflows. Developed features for audience segmentation, campaign orchestration, automated messaging workflows, and actionable insights through a scalable full-stack architecture, enabling businesses to manage customer engagement more effectively.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Express.js', 'AI Integrations'],
    status: 'not-deployed',
    notDeployedReason: 'Backend services and AI inference layers are currently paused to manage cloud costs.',
    githubUrl: 'https://github.com/Pinaki2046K/Xeno',
    screenshots: [
      '/aria-crm-1.png',
      '/aria-crm-2.png',
      '/aria-crm-3.png',
      '/aria-crm-4.png'
    ],
    thumbnail: '/aria-crm-1.png',
    iconType: 'robot',
  },
];


export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  'web-app': 'Web Apps',
  'ai-ml': 'AI · ML',
  'productivity': 'Productivity',
  'fullstack': 'Full Stack',
};
