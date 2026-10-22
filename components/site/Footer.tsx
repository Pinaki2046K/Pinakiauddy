import { PROFILE } from '@/lib/data/profile';

export default function Footer() {
  return (
    <div className="footer-wrap">
      <footer className="footer">
        <p>© 2026 Pinaki Auddy. Designed and built by me.</p>
        <ul className="footer__links">
          <li>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
          <li>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </li>
          <li>
            <a href="#top">Back to top</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
