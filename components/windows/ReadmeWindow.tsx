'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const README_CONTENT = `# README.md

> *"Pinaka" — Shiva's bow. Precision, pull, and the knowledge of when to release.*

---

## Who am I

I'm Pinaki Auddy, a final-year Computer Science student specializing in Big Data Analytics at SRM Institute of Science and Technology.
I enjoy building software that solves real-world problems. Over the past few years, I've worked on ERP systems, CRM platforms, event management applications, and organizational websites, taking projects from idea to deployment while learning how products behave beyond the development environment.
My interests lie in full-stack engineering, backend systems, and scalable software architecture. I enjoy designing clean user experiences, building reliable APIs, working with databases, and making engineering decisions that prioritize maintainability and long-term growth.
More than any specific framework or technology, I'm interested in understanding how systems work under the hood. Whether it's designing a database schema, optimizing application performance, or evaluating architectural tradeoffs, I enjoy the problem-solving aspect of software engineering.

---

## Why This Portfolio Looks Different

Most portfolio websites focus on showcasing finished projects. 

This one focuses on showcasing how I think.

A project is more than a screenshot or a deployment link. The interesting part is often the architecture behind it—the tradeoffs, constraints, and decisions that shaped the final product. Throughout this portfolio, you'll find context around those decisions because understanding why something was built is often more valuable than simply seeing what was built.

The operating system-inspired interface wasn't created purely for aesthetics. Building it required solving challenges around state management, component orchestration, responsive design, accessibility, and user interaction patterns. The design itself became an engineering exercise.

---

## What I Work With

**Full-Stack Development**
Building modern web applications using Next.js, React, TypeScript, Node.js, Express.js, PostgreSQL, MongoDB, and Supabase.

**Backend Engineering**
Designing APIs, authentication systems, database architectures, and scalable backend services with a focus on reliability, performance, and maintainability.

**Problem Solving & Algorithms**
Applying Data Structures and Algorithms to solve complex problems efficiently while continuously improving through coding contests, interview preparation, and practical software development.

**Product Engineering**
Turning ideas into usable products by balancing technical requirements, business goals, and user needs while maintaining clean and scalable codebases.

---

## What I'm Learning

I believe strong software engineering is built on both practical development experience and solid computer science fundamentals.

Alongside building full-stack applications, I'm actively strengthening my understanding of Data Structures & Algorithms, system design, backend architecture, and scalable software development. I'm particularly interested in the gap between writing code that works and building systems that remain reliable, efficient, and maintainable as complexity grows.

Every project teaches something new, and that's what keeps me excited about engineering.

---

## Let's Connect

I'm currently seeking Software Engineering opportunities for the 2026 placement season.

If you'd like to discuss technology, projects, internships, or opportunities, feel free to reach out.

Email: **[pinakiauddy49@gmail.com](mailto:pinakiauddy49@gmail.com)**

`;

export default function ReadmeWindow() {
  return (
    <div className="readme-window">
      <div className="readme-filename">
        <span className="readme-file-icon" aria-hidden="true">📄</span>
        README.md
      </div>
      <div className="readme-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <h1 className="readme-h1">{children}</h1>,
            h2: ({ children }) => <h2 className="readme-h2">{children}</h2>,
            h3: ({ children }) => <h3 className="readme-h3">{children}</h3>,
            p: ({ children }) => <p className="readme-p">{children}</p>,
            ul: ({ children }) => <ul className="readme-ul">{children}</ul>,
            li: ({ children }) => <li className="readme-li">{children}</li>,
            strong: ({ children }) => <strong className="readme-strong">{children}</strong>,
            em: ({ children }) => <em className="readme-em">{children}</em>,
            blockquote: ({ children }) => <blockquote className="readme-blockquote">{children}</blockquote>,
            code: ({ children }) => <code className="readme-code">{children}</code>,
            hr: () => <hr className="readme-hr" />,
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" className="readme-link">
                {children}
              </a>
            ),
          }}
        >
          {README_CONTENT}
        </ReactMarkdown>
      </div>
    </div>
  );
}
