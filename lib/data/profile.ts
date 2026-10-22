export const PROFILE = {
  name: 'Pinaki Auddy',
  email: 'pinakiauddy49@gmail.com',
  city: 'Chennai, India',
  resume: '/resume.pdf',
  github: 'https://github.com/Pinaki2046K',
  linkedin: 'https://www.linkedin.com/in/pinaki-auddy/',
};

export const FACTS = [
  { label: 'Studying', value: 'B.Tech CSE, Big Data Analytics, SRMIST · 9.48 CGPA' },
  { label: 'Based in', value: 'Chennai, India' },
  { label: 'Looking for', value: 'AI Generalist and product design roles' },
];

export const EXPERIENCE = [
  {
    role: 'Software Development Intern',
    org: 'NIT Hamirpur · Ministry of Education project',
    dates: 'Feb – Apr 2025',
    note: 'Integrated a Hugging Face image-classification model into a live e-waste reporting platform, turning its predictions into structured records, and designed the API workflows that send them to the nodal centre for reporting and evaluation.',
  },
  {
    role: 'Software Development Intern',
    org: 'IFIA Bharat · Remote',
    dates: 'Dec 2024 – Jan 2025',
    note: 'Led a four-person front-end team to deliver the organisation’s responsive website two months ahead of schedule, then tuned performance and SEO for an estimated 30%+ rise in traffic.',
  },
];

export const RECOGNITION = [
  {
    role: '1st Runner Up, Full Stack Hackathon',
    org: 'VIT Chennai',
    dates: '',
    note: 'Led a team of four, among 90+ teams, to build an event platform with sign-in, registration and payments.',
  },
  {
    role: 'Technical Team Lead',
    org: 'CHiPSET, SRMIST',
    dates: 'Aug 2025 – Present',
    note: 'Lead a 45+ member technical team that runs the club’s website and technical operations, and organised 10+ technical initiatives for 80+ participants.',
  },
];

export const TOOLKIT = [
  {
    group: 'Design',
    items: ['Interface design in code', 'Responsive, accessible layouts', 'Dashboards and data views', 'Booking and checkout flows', 'Tailwind CSS'],
  },
  {
    group: 'AI',
    items: ['Claude, ChatGPT, Gemini', 'Hugging Face models', 'AI model API integration', 'Prompting and prototyping with LLMs'],
  },
  {
    group: 'Build',
    items: ['Python, SQL, TypeScript', 'Next.js and React', 'Django and Node.js', 'PostgreSQL, MySQL, MongoDB', 'Git, Docker, CI/CD'],
  },
];

/** What I do: each capability is shown with a real screen from the work. */
export const CAPABILITIES = [
  {
    name: 'Product and interface design',
    where: 'ARIA, VibeCheck',
    text: 'From the first user flow to the finished screen: hierarchy, states and the small decisions that make a dense tool feel calm.',
    image: { src: '/aria-crm-3.png', alt: 'ARIA campaign templates', width: 1024, height: 706 },
  },
  {
    name: 'AI-powered product flows',
    where: 'ARIA, NIT Hamirpur',
    text: 'Products where AI does real work: describing an audience in plain language to get a segment back, or turning an image model’s predictions into structured reports.',
    image: { src: '/aria-crm-2.png', alt: 'ARIA segments defined in natural language', width: 1024, height: 672 },
  },
  {
    name: 'Dashboards and data',
    where: 'GWS ERP, VibeCheck',
    text: 'Screens that lead with the few numbers that matter, then the trend and the detail, so a team starts every day from the same picture.',
    image: { src: '/work/gws-dashboard.jpg', alt: 'GWS ERP dashboard overview', width: 2000, height: 1141 },
  },
  {
    name: 'Booking and checkout',
    where: 'VibeCheck',
    text: 'Flows that take someone from browsing to a confirmed ticket or order with as few steps and as few doubts as possible.',
    image: { src: '/vibecheck-1.jpg', alt: 'VibeCheck checkout with payment options', width: 1024, height: 609 },
  },
  {
    name: 'Websites with a voice',
    where: 'KET India, IFIA Bharat',
    text: 'Responsive, accessible sites that tell an organisation’s story with dignity and make the main action, like a donation, easy to find.',
    image: { src: '/work/ket-mehsana-home.jpg', alt: 'KET India home page', width: 1800, height: 1125 },
  },
  {
    name: 'Rules made usable',
    where: 'FleetLog',
    text: 'Turning dense regulations into a simple form and a plan anyone can trust, backed by an engine that is tested case by case.',
    image: { src: '/work/fleetlog-log.jpg', alt: 'FleetLog daily log sheet', width: 2880, height: 1800 },
  },
  {
    name: 'Design that ships',
    where: 'Next.js, TypeScript',
    text: 'I build what I design, so every decision is made knowing what it costs to build, and nothing is lost between the idea and the product.',
    image: { src: '/work/vickybytes-2.jpg', alt: 'VickyBytes Live event grid', width: 1800, height: 1125 },
  },
];
