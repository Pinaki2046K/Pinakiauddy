export type ProjectStatus = 'deployed' | 'not-deployed' | 'in-progress';

export interface Screen {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  /** Short title shown on the work list */
  title: string;
  /** Full name used in the case viewer */
  name: string;
  discipline: string;
  summary: string;
  description: string[];
  contribution: string[];
  stack: string[];
  status: ProjectStatus;
  statusNote?: string;
  liveUrl?: string;
  githubUrl?: string;
  screens: Screen[];
  /** Index into `screens` used as the cover in the work list (defaults to the first) */
  cover?: number;
  /** The design story told on the case study page */
  story?: Story;
}

export interface Story {
  problem: string;
  audience: string;
  decisions: { title: string; why: string }[];
  outcome: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'fleetlog',
    title: 'FleetLog',
    name: 'FleetLog, trip planner and ELD log generator',
    discipline: 'Rule-driven product · full-stack build',
    summary:
      'Turns a truck route and a driver’s hours into a legally compliant schedule, with every rest, break and fuel stop placed for them.',
    description: [
      'A full-stack trip planner that turns a route and a driver’s hours into a plan that follows US Hours of Service rules, with one log sheet for every day of the trip.',
    ],
    contribution: ['Interface and interaction design', 'Rules engine in Python', 'Full-stack build'],
    stack: ['Django', 'Django REST Framework', 'React', 'TypeScript', 'PostgreSQL', 'Leaflet'],
    status: 'not-deployed',
    statusNote: 'Backend hosting has lapsed; the code and tests are on GitHub.',
    githubUrl: 'https://github.com/Pinaki2046K/spotter-eld-truck',
    screens: [
      { src: '/work/fleetlog-1.jpg', alt: 'FleetLog trip form: current, pickup and dropoff locations and the hours already used this cycle', width: 1440, height: 900 },
      { src: '/work/fleetlog-plan.jpg', alt: 'FleetLog trip plan from Chicago to Denver: totals, hours-of-service limits, the required stops and the route map', width: 2880, height: 2360 },
      { src: '/work/fleetlog-log.jpg', alt: 'FleetLog daily log sheet with the duty-status graph, total hours and remarks for each stop', width: 2880, height: 1800 },
    ],
    cover: 1,
    story: {
      problem:
        'US truck drivers must follow federal Hours of Service rules: at most 11 hours of driving inside a 14-hour window, a 30-minute break after 8 hours, and no more than 70 on-duty hours in 8 days until a 34-hour restart. Working out a legal plan for a multi-day trip by hand is slow, and one mistake means a violation.',
      audience:
        'Property-carrying truck drivers and the dispatchers who plan their trips. They know where they are, where they pick up, where they drop off and how many hours they have already used. They should not need to know the regulations by heart.',
      decisions: [
        {
          title: 'Ask only for what the driver already knows',
          why: 'The form takes three locations and the hours used this cycle. Every rest, break, fuel stop and restart is worked out from those four answers, so planning a trip takes seconds instead of a calculation.',
        },
        {
          title: 'Show every limit as a bar, with the rule beside it',
          why: 'Driving, duty window, time since break and cycle hours each get a progress bar against its limit and a reference to the regulation it comes from. A driver can see how close the plan runs to each limit, and anyone checking it can trace every number back to the rule.',
        },
        {
          title: 'Explain why each stop exists',
          why: 'Every stop carries its reason, such as “10-hour reset: 11-hour driving limit reached” or “Also satisfies the 30-min break”. The plan reads as a set of decisions the driver can understand, not a black box.',
        },
        {
          title: 'Draw the log sheet the way drivers already know it',
          why: 'The daily log follows the familiar paper grid: four duty-status rows across 24 hours, totals on the right and remarks for each location. It is rendered as SVG and exports to PDF, so it is ready to hand over.',
        },
        {
          title: 'Use a deterministic engine, not AI, for the rules',
          why: 'Compliance has to be exact and repeatable. The rules are encoded as explicit state transitions in Python, so the same trip always produces the same plan and every output can be verified.',
        },
      ],
      outcome: [
        'A full trip planned automatically: Chicago to St. Louis to Denver comes back as 1,150 miles over 2 log days, with the required reset and fuel stops already placed.',
        'Validated with 180+ structured test cases, including edge cases such as duty periods that cross midnight.',
        'Daily logs generated as SVG and exported to PDF, one sheet per day of the trip.',
      ],
    },
  },
  {
    id: 'gws-erp',
    title: 'GWS ERP',
    name: 'Global Water Solutions ERP',
    discipline: 'Dashboard design · full-stack build',
    summary:
      'A paper-based business turned into one dashboard: customers, service contracts, payments and complaints, now in daily use.',
    description: [
      'An ERP that replaced an entirely paper-based workflow for a water-purification service business, designed and built end to end together with its owner.',
    ],
    contribution: ['Information architecture', 'Dashboard and data-visualisation design', 'Full-stack build'],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    status: 'deployed',
    statusNote: 'In daily production use by the client.',
    githubUrl: 'https://github.com/Pinaki2046K/global-water-solutions',
    screens: [
      { src: '/work/gws-dashboard.jpg', alt: 'GWS ERP dashboard overview: total customers, active AMCs, pending dues and open complaints, with revenue analytics and recent activity', width: 2000, height: 1141 },
      { src: '/work/gws-customers.jpg', alt: 'GWS ERP customer management with search, filters and each customer’s active services (customer details blurred)', width: 2000, height: 1320 },
      { src: '/work/gws-services.jpg', alt: 'GWS ERP service management: total services, active and inactive AMCs, and recent service records', width: 2000, height: 1314 },
      { src: '/work/gws-payments.jpg', alt: 'GWS ERP payments with collected, pending and failed totals above the recent transactions', width: 2000, height: 1291 },
    ],
    story: {
      problem:
        'Global Water Solutions installs and services water purification systems. Every customer, annual maintenance contract (AMC), service visit, payment and complaint lived on paper, so answering simple questions, such as who still owes money or which complaints are open, meant searching through registers.',
      audience:
        'The business owner, who is not technical and needs the state of the business at a glance, and the staff who log customers, services and payments every day.',
      decisions: [
        {
          title: 'Mirror the paper registers the team already used',
          why: 'Customers, AMC contracts, services, payments and complaints each became their own module. The team kept working in the same categories they knew, which made the switch from paper easy for non-technical staff.',
        },
        {
          title: 'Lead the dashboard with four numbers',
          why: 'Total customers, active AMCs, pending dues and open complaints sit at the top of the overview. They answer the owner’s daily questions before anything else, with revenue over time and a feed of recent activity underneath.',
        },
        {
          title: 'Put the money first on the payments screen',
          why: 'Collected, pending and failed totals sit above the transaction list, so money that is still owed is visible before anyone starts reading rows.',
        },
        {
          title: 'Give each role only what it needs',
          why: 'Authentication and role-based access keep day-to-day screens simple for staff, while the owner sees the whole business.',
        },
        {
          title: 'Build it with the owner, not just for them',
          why: 'I worked directly with the owner to map the old workflow, then kept shipping changes from their feedback, so the system grew around how the business actually runs.',
        },
      ],
      outcome: [
        'In daily production use, replacing the paper-based workflow.',
        '15+ connected modules, with authentication and role-based access.',
        'The client credits the system with faster operations and business growth.',
      ],
    },
  },
  {
    id: 'aria-crm',
    title: 'ARIA',
    name: 'ARIA, an AI-powered CRM',
    discipline: 'AI product · interface design and build',
    summary:
      'A CRM where AI helps plan and run customer campaigns: audience segments, multi-channel sends and the insight that follows.',
    description: [
      'ARIA combines customer management with AI-assisted campaign workflows. The interface had to make a dense set of tools feel calm: segments you describe in plain language, campaigns across email, SMS and WhatsApp, reusable templates and a full audit log.',
      'I designed the dark, status-led campaign views so a marketer can read the state of every send at a glance, then built the full stack behind them.',
    ],
    contribution: ['Interface and interaction design', 'AI-assisted campaign flows', 'Full-stack build'],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Express.js', 'AI integrations'],
    status: 'not-deployed',
    statusNote: 'Backend and AI inference are paused to manage cloud costs.',
    githubUrl: 'https://github.com/Pinaki2046K/Xeno',
    screens: [
      { src: '/aria-crm-3.png', alt: 'ARIA campaign templates for re-engagement and VIP early access', width: 1024, height: 706 },
      { src: '/aria-crm-2.png', alt: 'ARIA segments, defined in natural language or with filters', width: 1024, height: 672 },
      { src: '/aria-crm-1.png', alt: 'ARIA campaigns list with channel and status for each send', width: 1024, height: 703 },
      { src: '/aria-crm-4.png', alt: 'ARIA audit log of campaign and segment activity', width: 1024, height: 698 },
    ],
  },
  {
    id: 'vibecheck',
    title: 'VibeCheck',
    name: 'VibeCheck, event ticketing',
    discipline: 'Booking flows · full-stack build',
    summary:
      'A platform to browse events, book tickets and manage reservations, with an admin side for organisers.',
    description: [
      'VibeCheck lets people browse events, book tickets and manage their reservations, while organisers create, update and monitor events from their own dashboard.',
      'I designed the booking flow and the organiser views, with role-based access, user dashboards and event analytics, and built the REST backend behind them.',
    ],
    contribution: ['Booking and checkout flow', 'Organiser dashboard design', 'Full-stack build'],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT authentication', 'REST APIs'],
    status: 'in-progress',
    githubUrl: 'https://github.com/Pinaki2046K/event-ticket-management',
    screens: [
      { src: '/vibecheck-5.jpg', alt: 'VibeCheck event management view with event cards and prices', width: 1024, height: 599 },
      { src: '/vibecheck-4.jpg', alt: 'VibeCheck analytics hub with ticket sales over time', width: 1024, height: 581 },
      { src: '/vibecheck-3.jpg', alt: 'VibeCheck merch store', width: 1024, height: 581 },
      { src: '/vibecheck-2.jpg', alt: 'VibeCheck shopping cart drawer', width: 1024, height: 596 },
      { src: '/vibecheck-1.jpg', alt: 'VibeCheck checkout with card, netbanking and wallet payment options', width: 1024, height: 609 },
    ],
  },
  {
    id: 'vickybytes-live',
    title: 'VickyBytes',
    name: 'VickyBytes Live, event streaming',
    discipline: 'Interface design · front-end build',
    summary:
      'A live-event streaming interface: what is on air now, a searchable schedule and a custom player, with a retro broadcast feel.',
    description: [
      'Built as a front-end engineering assignment, VickyBytes Live gathers music festivals, esports finals, tech keynotes and live talks in one place.',
      'The interface leads with what is on air right now, then a dense, filterable event grid with live status on every card, set in a retro broadcast style over a modern Next.js App Router build.',
    ],
    contribution: ['Visual direction', 'Responsive event grid and live states', 'Front-end build'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'App Router'],
    status: 'deployed',
    liveUrl: 'https://event-streaming-dusky.vercel.app',
    githubUrl: 'https://github.com/Pinaki2046K',
    screens: [
      { src: '/work/vickybytes-1.jpg', alt: 'VickyBytes Live home with the on-air hero and live player', width: 1800, height: 1125 },
      { src: '/work/vickybytes-2.jpg', alt: 'VickyBytes Live event grid with search, filters and live badges', width: 1800, height: 1125 },
    ],
  },
  {
    id: 'ket-mehsana',
    title: 'KET India',
    name: 'KET Mehsana, NGO website',
    discipline: 'Website design · non-profit',
    summary:
      'The website of Khodiyar Education Trust, a non-profit working with children with intellectual disabilities since 1994.',
    description: [
      'Khodiyar Education Trust in Mehsana needed a site that tells its story with dignity and makes giving easy. I designed and built a responsive website that presents its mission, programmes, events and impact.',
      'The home page leads with the people the trust serves, a clear donation action and its credentials, and the build is tuned for accessibility and search.',
    ],
    contribution: ['Visual and content design', 'Responsive, accessible build', 'SEO'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'SEO'],
    status: 'deployed',
    liveUrl: 'https://ket-pearl.vercel.app/',
    githubUrl: 'https://github.com/Pinaki2046K/KET-Mehsana',
    screens: [
      { src: '/work/ket-mehsana-home.jpg', alt: 'KET India home page: Every child deserves to bloom', width: 1800, height: 1125 },
      { src: '/ket-mehsana-1.jpg', alt: 'KET India hero with the donate action and credentials', width: 1024, height: 606 },
    ],
  },
];

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  deployed: 'Live',
  'not-deployed': 'Paused',
  'in-progress': 'In progress',
};
