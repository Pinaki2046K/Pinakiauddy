# PinakaOS — Developer Portfolio

> *"Pinaka" — Shiva's bow. Precision, pull, and the knowledge of when to release.*

A uniquely designed, OS-inspired developer portfolio built to showcase engineering mindset, architecture decisions, and full-stack capabilities, rather than just displaying a list of project links.

![PinakaOS Interface](./public/bow.png)

## 🌟 Philosophy

Most portfolio websites trend toward the same format: clean cards, project thumbnails, and a PDF link. While legible, it often fails to convey *how* an engineer thinks. 

**PinakaOS** was built with a different philosophy:
- **Architecture over Aesthetics:** The operating system metaphor isn't just decoration. It forced constraints requiring state management, z-index stacking, responsive fallbacks, and accessibility handling.
- **Context over Demos:** Projects are documented with their architectural tradeoffs, constraints, and the *why* behind deployment decisions, providing a stronger signal than just a live Vercel URL.
- **Mobile First (Paradigm Shift):** Instead of cramming a desktop OS into a 6-inch screen, the application features a bespoke `@media` query layout shift, delivering a native-feeling mobile app experience on smaller devices.

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** Vanilla CSS (CSS Modules & Globals)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Window Management:** [react-rnd](https://github.com/bokuweb/react-rnd)
- **Forms API:** [Web3Forms](https://web3forms.com/)
- **Typography:** JetBrains Mono + Inter

## ⚙️ Key Features

- **Draggable Window Manager:** Fully interactive windows that can be dragged, resized, minimized to the dock, maximized, and focused (with proper z-index management).
- **Interactive Terminal:** A fully functional mock terminal for exploring technical skills via command-line interface.
- **Markdown Renderer:** Custom `react-markdown` implementation for displaying rich README content directly in the UI.
- **Boot Sequence:** A heavily optimized, terminal-style boot-up animation.
- **Web3Forms Integration:** Fully functional contact form that delivers messages directly to email.

## 🛠️ Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pinaki2046K/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📫 Contact

- **Email:** [pinakiauddy49@gmail.com](mailto:pinakiauddy49@gmail.com)
- **LinkedIn:** [pinaki-auddy](https://www.linkedin.com/in/pinaki-auddy/)
- **GitHub:** [Pinaki2046K](https://github.com/Pinaki2046K)

---
*Built with precision and care by Pinaki Auddy.*
