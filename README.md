# Pinaki Auddy — Portfolio

Portfolio of Pinaki Auddy, product designer and engineer, live at **[pinakiauddy.vercel.app](https://pinakiauddy.vercel.app)**.

It presents six products I designed and built end to end, each with its own case study page covering the problem, who it is for, the design decisions behind it and the outcome:

- **FleetLog**: a trip planner that turns a route and a driver's hours into a plan that follows US Hours of Service rules, with a daily log sheet for every day of the trip
- **GWS ERP**: an ERP that replaced a paper-based workflow for a water-purification service business, now in daily use
- **ARIA**: an AI-powered CRM for planning and running customer campaigns
- **VibeCheck**: event ticketing with booking flows and an organiser dashboard
- **VickyBytes Live**: a live-event streaming interface
- **KET India**: the website of Khodiyar Education Trust, a non-profit in Mehsana

## Built with

- [Next.js](https://nextjs.org) (App Router), React and TypeScript
- Plain CSS with design tokens, set in [General Sans](https://www.fontshare.com/fonts/general-sans) loaded through `next/font/local`
- Case study pages generated statically from `lib/data/projects.ts`
- Contact form through [Web3Forms](https://web3forms.com)
- Deployed on [Vercel](https://vercel.com)

## Project structure

```
app/
  page.tsx              Home: hero, selected work, what I do, about, contact
  work/[slug]/page.tsx  One case study page per project
  globals.css           All styles and design tokens
components/site/        Page sections and shared pieces
lib/data/
  projects.ts           Projects, screenshots and case study content
  profile.ts            Facts, experience, recognition, toolkit and capabilities
public/                 Portrait, résumé and project screenshots
```

To add or edit a project, change `lib/data/projects.ts`; its case study page is generated from that entry.

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).
