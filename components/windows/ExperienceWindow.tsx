'use client';

const EXPERIENCE_DATA = [
  {
    role: "Frontend Developer Intern",
    company: "IFIA Bharat",
    date: "Dec 2024 — Feb 2025",
    built: "Led the frontend development of the organization's website from inception to deployment, creating responsive and accessible interfaces with a focus on performance and user experience.",
    impact: "Increased website footfall and improved search engine rankings through performance enhancements and SEO best practices, strengthening the organization's digital reach.",
    tech: "Next.js, TypeScript, Tailwind CSS, Git, GitHub"
  },
  {
    role: "Frontend Development Intern",
    company: "NIT Hamirpur Centre for E-Waste Management",
    date: "Feb 2025 — Apr 2025",
    built: "Developed responsive and accessible frontend interfaces for an e-waste management platform under a Ministry of Education-funded initiative, translating complex workflows into intuitive user experiences.",
    impact: "Facilitated seamless interaction between users, backend services, and AI-powered components through effective cross-functional collaboration and modern frontend engineering practices.",
    tech: "Next.js, TypeScript, Tailwind CSS, JavaScript, Git, GitHub"
  }
];

export default function ExperienceWindow() {
  return (
    <div className="readme-window experience-window">
      <div className="readme-filename">
        <span className="readme-file-icon" aria-hidden="true">💼</span>
        experience.log
      </div>
      <div className="readme-body experience-body">
        {EXPERIENCE_DATA.map((exp, i) => (
          <div key={i} className="exp-entry">
            <div className="exp-header">
              <h2 className="readme-h2">{exp.role} — {exp.company}</h2>
              <span className="exp-date">{exp.date}</span>
            </div>
            <div className="exp-content">
              <p className="readme-p"><strong>Built:</strong> {exp.built}</p>
              <p className="readme-p"><strong>Impact:</strong> {exp.impact}</p>
              <p className="readme-p"><strong>Tech:</strong> {exp.tech}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
